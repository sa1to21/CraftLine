import HomePage from './components/HomePage';

// JSON-LD Schema for SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://craftline.com/#organization",
  "name": "CraftLine Deck & Fence",
  "alternateName": "CraftLine",
  "description": "Professional deck, porch, and fence restoration services in Sacramento and surrounding areas. Licensed and insured with quality workmanship.",
  "url": "https://craftline.com/",
  "telephone": "(916) 841-4316",
  "email": "CraftLine.Prodeck@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sacramento",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.7816,
    "longitude": -121.4944
  },
  "areaServed": [
    { "@type": "City", "name": "Sacramento", "addressRegion": "CA" },
    { "@type": "City", "name": "Roseville", "addressRegion": "CA" },
    { "@type": "City", "name": "Folsom", "addressRegion": "CA" },
    { "@type": "City", "name": "Rocklin", "addressRegion": "CA" },
    { "@type": "City", "name": "Elk Grove", "addressRegion": "CA" },
    { "@type": "City", "name": "Lincoln", "addressRegion": "CA" },
    { "@type": "City", "name": "Granite Bay", "addressRegion": "CA" },
    { "@type": "City", "name": "El Dorado Hills", "addressRegion": "CA" }
  ],
  "serviceType": [
    "Deck Restoration",
    "Fence Repair",
    "Wood Staining",
    "Porch Restoration",
    "Pergola Installation"
  ],
  "priceRange": "$$",
  "image": "https://craftline.com/icon.png",
  "logo": "https://craftline.com/icon.png",
  "sameAs": [
    "https://www.instagram.com/craftline.sacramento",
    "https://yelp.to/1YJwTMiSXR",
    "https://maps.app.goo.gl/x312YhivPyDcfheA8"
  ],
  "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-16:00",
  "paymentAccepted": "Cash, Check, Credit Card",
  "currenciesAccepted": "USD"
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Home Improvement",
  "provider": {
    "@type": "LocalBusiness",
    "name": "CraftLine Deck & Fence",
    "url": "https://craftline.com/"
  },
  "areaServed": {
    "@type": "State",
    "name": "California"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Deck & Fence Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Deck Restoration",
          "description": "Professional pressure washing, sanding, staining and sealing as well as board and structural post replacement."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wooden Porch Restoration",
          "description": "Expert repairs, sanding and refinishing with paint or stain to restore beauty and durability to your porch."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fence Repair & Staining",
          "description": "Post replacement, board repairs, pressure washing and professional staining to extend fence life and curb appeal."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pergola Installation",
          "description": "Custom pergolas and shade structures built with quality craftsmanship to enhance your outdoor living space."
        }
      }
    ]
  }
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <HomePage />
    </>
  );
}
