# VTU Results Checker with Google AdSense

A modern Next.js application for checking VTU (Visvesvaraya Technological University) exam results with SGPA calculation and Google AdSense monetization.

## Features

- ✅ **VTU Results Checker**: Fetch and display VTU examination results
- 📊 **SGPA Calculator**: Automatically calculate SGPA with customizable credits
- 🎯 **Performance Metrics**: Visual representation of academic performance
- 💰 **Google AdSense Integration**: Monetize with strategically placed ads
- 🔒 **Privacy-Focused**: No data storage, real-time fetching
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Fast & Optimized**: Built with Next.js 14 App Router
- 🍪 **GDPR Compliant**: Cookie consent banner included

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Deployment**: Vercel
- **Monetization**: Google AdSense

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google AdSense account (for monetization)

### Installation

1. **Clone or download this project**

```bash
cd vtu-results-adsense
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=VTU Results Checker
```

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your actual AdSense Publisher ID.

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

### Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

### Step 2: Deploy

#### Option A: Using Vercel Web Interface

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables in the Vercel dashboard
5. Deploy!

#### Option B: Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Step 3: Configure Environment Variables in Vercel

Go to your Vercel project dashboard → Settings → Environment Variables

Add:
- `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`: Your AdSense Publisher ID
- `NEXT_PUBLIC_SITE_URL`: Your production URL (e.g., https://your-site.vercel.app)
- `NEXT_PUBLIC_SITE_NAME`: Your site name

## Google AdSense Setup

See [ADSENSE_SETUP.md](./ADSENSE_SETUP.md) for detailed instructions on:
- Creating an AdSense account
- Getting approved
- Configuring ad units
- Optimizing ad placement

## Project Structure

```
vtu-results-adsense/
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── single-post/    # API route for VTU results
│   ├── contact/            # Contact page
│   ├── privacy-policy/     # Privacy policy page
│   ├── terms-of-service/   # Terms of service page
│   ├── layout.tsx          # Root layout with AdSense
│   ├── page.tsx            # Main results page
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots configuration
├── components/
│   ├── AdSense/
│   │   ├── AdUnit.tsx      # Display ad component
│   │   ├── InFeedAd.tsx    # In-feed ad component
│   │   └── AutoAds.tsx     # Auto ads component
│   ├── ui/                 # shadcn/ui components
│   ├── CookieConsent.tsx   # Cookie consent banner
│   └── SEO.tsx             # SEO component
├── lib/
│   └── utils.ts            # Utility functions
├── public/
│   ├── ads.txt             # AdSense verification
│   └── robots.txt          # Static robots file
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment config
```

## AdSense Ad Placements

The application includes strategically placed ads:

1. **Top Banner** (Homepage): Above the results form
2. **In-Feed Ads**: Below the form and between subject results
3. **Sidebar Ad**: In the SGPA panel area
4. **Bottom Banner**: After results display
5. **Auto Ads**: Automatic placement by Google

## Important Files to Update

Before deploying, make sure to update:

1. **`public/ads.txt`**: Replace with your actual AdSense Publisher ID
2. **`.env.local`**: Add your AdSense Publisher ID
3. **Public folder**: Add favicon.ico and og-image.png for SEO

## SEO Features

- ✅ Dynamic sitemap.xml
- ✅ Robots.txt configured
- ✅ Meta tags on all pages
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Schema.org markup ready

## Legal Pages (Required for AdSense)

All required legal pages are included:
- Privacy Policy
- Terms of Service
- About
- Contact

## Tips for AdSense Approval

1. **Original Content**: All pages have unique, valuable content
2. **Navigation**: Clear navigation with footer and header
3. **Traffic**: Wait until you have consistent traffic (50+ daily visitors recommended)
4. **Age**: Website should be at least 6 months old (preferred, not required)
5. **Legal Pages**: All required pages are included
6. **Mobile-Friendly**: Fully responsive design
7. **Fast Loading**: Optimized with Next.js

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Adding New Features

The codebase is well-structured for easy modifications:
- Add new pages in `app/` directory
- Create UI components in `components/`
- Modify styles in `app/globals.css` or Tailwind config

## Troubleshooting

### Ads not showing?

- Check that `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` is set correctly
- Verify ads.txt file has your Publisher ID
- Wait 24-48 hours after AdSense approval for ads to appear
- Check browser console for AdSense errors

### Build errors?

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## Support

For issues or questions:
- Check the `/contact` page for support options
- Review [ADSENSE_SETUP.md](./ADSENSE_SETUP.md) for AdSense questions

## License

This project is provided as-is for educational and commercial purposes.

## Disclaimer

This application is not affiliated with VTU (Visvesvaraya Technological University).  
Always verify results with official VTU sources.

---

**Made with ❤️ for VTU Students**

Deploy to Vercel and start earning with Google AdSense! 🚀
