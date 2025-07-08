# Next.js Mixed Router with next-intl Translation Demo

This project demonstrates how to implement a **mixed routing architecture** using both Next.js App Router and Pages Router simultaneously, with German-only translations powered by `next-intl`.

## What This Project Showcases

### 1. Mixed Router Architecture
- **App Router** and **Pages Router** coexisting in the same application
- App Router handles the root route (`/`) and modern routes
- Pages Router handles legacy routes (`/about`, `/contact`, `/products/[id]`)
- No route conflicts between the two routing systems

### 2. Advanced Translation Setup
- **German-only translations** without URL locale identifiers
- **Environment-aware translation loading**:
  - HTTP fetching in production
  - Local file system access in development
- **Multiple namespaces** for organized translations (`common`, `navigation`, `forms`, `products`)
- **Unified translation access** across both routing systems

### 3. Dynamic Translation Loading
- Custom translation loader with caching mechanism
- Namespace merging for multiple translation files
- Robust error handling and fallback mechanisms
- Performance optimizations for translation loading

### 4. Production-Ready Features
- Environment-specific configuration
- Error boundaries for translation failures
- Caching strategies for improved performance
- Comprehensive logging and debugging

## Architecture Overview

```
├── src/app/              # App Router (Next.js 15+)
│   ├── layout.tsx        # Root layout with NextIntlClientProvider
│   └── page.tsx          # Homepage
├── pages/                # Pages Router (Legacy)
│   ├── _app.tsx          # App wrapper with translations
│   ├── _document.tsx     # Document structure
│   ├── about.tsx         # Static about page
│   ├── contact.tsx       # Contact page
│   └── products/[id].tsx # Dynamic product pages
├── src/lib/translations.ts # Translation loading logic
├── i18n/request.ts       # next-intl configuration
└── public/locales/de/    # German translation files
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Routes

- **App Router**: `/` (Homepage)
- **Pages Router**: 
  - `/about` (About page)
  - `/contact` (Contact page)
  - `/products/1` (Product detail page)

## Key Features Demonstrated

### Translation Loading
- **Development**: Loads translations from local JSON files
- **Production**: Fetches translations via HTTP from remote server
- **Caching**: In-memory caching prevents repeated file/network requests

### Error Handling
- Graceful fallbacks when translations fail to load
- Comprehensive error logging for debugging
- Prevents application crashes due to translation issues

### Performance Optimizations
- Lazy loading of translation namespaces
- Memory-efficient caching strategy
- Reduced initial page load times

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
