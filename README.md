# CraftLine — Deck & Fence Restoration

Professional deck, porch, and fence restoration services in Sacramento and surrounding areas.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
app/
├── layout.tsx           # Root layout with metadata & fonts
├── page.tsx             # Home page (Server Component with SEO)
├── not-found.tsx        # 404 page
├── components/
│   └── HomePage.tsx     # Main client component
└── globals.css          # Tailwind CSS v4 + custom styles

public/
├── icon.png            # Company logo
└── og-image.jpg        # Social media preview (to be added)
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Fonts**: Inter, Oswald (Google Fonts)
- **Icons**: Remix Icons, Font Awesome

## 🔧 Features

✅ **SEO Optimized**
- Server-Side Rendering (SSR)
- JSON-LD Schema.org markup
- OpenGraph & Twitter Cards
- Optimized metadata

✅ **Performance**
- Automatic code splitting
- Image optimization ready
- Font optimization
- CSS optimization

✅ **Responsive Design**
- Mobile-first approach
- Smooth scroll navigation
- Animated CTA buttons

✅ **Contact Form**
- Integrated with Google Sheets
- File upload support
- Real-time status updates

## 📝 Configuration

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://craftline.com
```

### Next.js Config

See [next.config.ts](next.config.ts) for:
- Image domains configuration
- Custom webpack config (if needed)

## 📖 Documentation

- [MIGRATION_NOTES.md](MIGRATION_NOTES.md) - Detailed migration guide from Vite
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-beta)

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Other Platforms

```bash
npm run build
# Deploy .next/ folder and node_modules/
```

## 📞 Contact

- **Phone**: (916) 841-4316
- **Email**: CraftLine.Prodeck@gmail.com
- **Instagram**: [@craftline.sacramento](https://www.instagram.com/craftline.sacramento)

---

Built with ❤️ using Next.js
