/**
 * CraftLine Contact Form Handler with Security
 * Google Apps Script endpoint for processing form submissions
 */

// Configuration
const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID', // Replace with your Google Sheets ID
  SHEET_NAME: 'Form Submissions',
  RATE_LIMIT_HOURS: 1, // Hours to track submissions from same IP
  MAX_SUBMISSIONS_PER_IP: 3, // Max submissions allowed per IP in time window
  ALLOWED_ORIGINS: [
    'https://yourdomain.com', // Replace with your actual domain
    'http://localhost:3000', // For local testing
  ]
};

/**
 * Main POST handler
 */
function doPost(e) {
  try {
    // Get client IP and timestamp
    const clientIP = getClientIP();
    const timestamp = new Date();

    // CORS headers
    const origin = e.parameter.origin || e.postData?.headers?.Origin;
    if (!isOriginAllowed(origin)) {
      return createResponse(403, 'Forbidden: Invalid origin');
    }

    // Parse form data
    const formData = {
      name: e.parameter.name || '',
      phone: e.parameter.phone || '',
      address: e.parameter.address || '',
      projectDetails: e.parameter.projectDetails || '',
      website: e.parameter.website || '', // Honeypot field
      photo: e.parameter.photo || null
    };

    // SECURITY CHECK 1: Honeypot
    if (formData.website && formData.website.trim() !== '') {
      logSubmission(clientIP, timestamp, 'BLOCKED', 'Honeypot triggered', formData);
      return createResponse(200, 'Thank you for your submission!'); // Fake success to fool bots
    }

    // SECURITY CHECK 2: Rate Limiting
    const rateLimitCheck = checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      logSubmission(clientIP, timestamp, 'BLOCKED', `Rate limit exceeded: ${rateLimitCheck.count} submissions`, formData);
      return createResponse(429, 'Too many requests. Please try again later.');
    }

    // SECURITY CHECK 3: Server-side validation
    const validation = validateFormData(formData);
    if (!validation.valid) {
      logSubmission(clientIP, timestamp, 'BLOCKED', `Validation failed: ${validation.errors.join(', ')}`, formData);
      return createResponse(400, `Validation error: ${validation.errors.join(', ')}`);
    }

    // All checks passed - save to spreadsheet
    saveToSpreadsheet(formData, clientIP, timestamp);

    // Log successful submission
    logSubmission(clientIP, timestamp, 'SUCCESS', 'Form submitted successfully', formData);

    // Send notification email (optional)
    sendNotificationEmail(formData);

    return createResponse(200, 'Form submitted successfully!');

  } catch (error) {
    Logger.log('Error processing form: ' + error.toString());
    return createResponse(500, 'Internal server error');
  }
}

/**
 * Validate form data
 */
function validateFormData(data) {
  const errors = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (data.name.length > 100) {
    errors.push('Name is too long');
  }

  // Phone validation (US format)
  const phoneRegex = /^[\d\s\-\(\)\.+]{10,20}$/;
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  // Address validation
  if (!data.address || data.address.trim().length < 5) {
    errors.push('Address must be at least 5 characters');
  }
  if (data.address.length > 200) {
    errors.push('Address is too long');
  }

  // Project details validation
  if (!data.projectDetails || data.projectDetails.trim().length < 10) {
    errors.push('Project details must be at least 10 characters');
  }
  if (data.projectDetails.length > 2000) {
    errors.push('Project details are too long');
  }

  // Check for common spam patterns
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|bitcoin|cryptocurrency)\b/i,
    /(http:\/\/|https:\/\/|www\.)\S+/gi, // Multiple URLs
    /<script|<iframe|javascript:/i, // XSS attempts
  ];

  const allText = `${data.name} ${data.projectDetails}`.toLowerCase();
  for (const pattern of spamPatterns) {
    if (pattern.test(allText)) {
      errors.push('Suspicious content detected');
      break;
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
}

/**
 * Check rate limiting for IP address
 */
function checkRateLimit(ip) {
  const sheet = getOrCreateSheet('Rate Limiting');
  const now = new Date();
  const cutoffTime = new Date(now.getTime() - (CONFIG.RATE_LIMIT_HOURS * 60 * 60 * 1000));

  // Get all recent submissions from this IP
  const data = sheet.getDataRange().getValues();
  let count = 0;

  for (let i = 1; i < data.length; i++) { // Skip header row
    const rowIP = data[i][0];
    const rowTime = new Date(data[i][1]);

    if (rowIP === ip && rowTime > cutoffTime) {
      count++;
    }
  }

  // Add current submission to rate limit tracker
  if (count < CONFIG.MAX_SUBMISSIONS_PER_IP) {
    sheet.appendRow([ip, now]);
  }

  return {
    allowed: count < CONFIG.MAX_SUBMISSIONS_PER_IP,
    count: count
  };
}

/**
 * Save form submission to spreadsheet
 */
function saveToSpreadsheet(data, ip, timestamp) {
  const sheet = getOrCreateSheet(CONFIG.SHEET_NAME);

  sheet.appendRow([
    timestamp,
    data.name,
    data.phone,
    data.address,
    data.projectDetails,
    ip,
    'Pending' // Status
  ]);
}

/**
 * Log submission (for security monitoring)
 */
function logSubmission(ip, timestamp, status, message, data) {
  const sheet = getOrCreateSheet('Security Log');

  sheet.appendRow([
    timestamp,
    ip,
    status,
    message,
    data.name || '',
    data.phone || '',
    JSON.stringify(data).substring(0, 500) // Truncated data
  ]);
}

/**
 * Send email notification (optional)
 */
function sendNotificationEmail(data) {
  // Uncomment and configure if you want email notifications
  /*
  const email = 'CraftLine.Prodeck@gmail.com';
  const subject = 'New CraftLine Estimate Request';
  const body = `
New estimate request received:

Name: ${data.name}
Phone: ${data.phone}
Address: ${data.address}

Project Details:
${data.projectDetails}

Please follow up with the customer.
  `;

  MailApp.sendEmail(email, subject, body);
  */
}

/**
 * Get or create sheet by name
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);

    // Add headers based on sheet type
    if (sheetName === CONFIG.SHEET_NAME) {
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Address', 'Project Details', 'IP Address', 'Status']);
    } else if (sheetName === 'Security Log') {
      sheet.appendRow(['Timestamp', 'IP', 'Status', 'Message', 'Name', 'Phone', 'Data']);
    } else if (sheetName === 'Rate Limiting') {
      sheet.appendRow(['IP Address', 'Timestamp']);
    }
  }

  return sheet;
}

/**
 * Get client IP address
 */
function getClientIP() {
  // Note: Google Apps Script doesn't easily provide real client IP
  // This is a limitation. Consider using Cloudflare or similar for real IP tracking
  return 'unknown';
}

/**
 * Check if origin is allowed (CORS)
 */
function isOriginAllowed(origin) {
  if (!origin) return false;
  return CONFIG.ALLOWED_ORIGINS.some(allowed => origin.includes(allowed));
}

/**
 * Create standardized response
 */
function createResponse(statusCode, message) {
  const response = {
    statusCode: statusCode,
    message: message,
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle OPTIONS request for CORS
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
