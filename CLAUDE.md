# Next.js Mixed Router with next-intl Setup - Action List

## Prerequisites
- Next.js 15 project with App Router
- Need to add Pages Router alongside App Router
- German-only translations (no URL locale identifiers)
- Remote translation loading (HTTP in production, local in dev)
- Multiple namespaces support

## Action Items

### 1. Setup Mixed Router Structure ✅
- [x] Create `pages/` directory in project root
- [x] Create `pages/_app.tsx` with NextIntlClientProvider
- [x] Create `pages/_document.tsx` for Pages Router
- [x] Create 3 Pages Router routes:
  - [x] `pages/about.tsx` - About page
  - [x] `pages/contact.tsx` - Contact page  
  - [x] `pages/products/[id].tsx` - Dynamic product page
- [x] Test that both routers coexist

### 2. Package Management ✅
- [x] Remove next-i18next: `npm uninstall next-i18next react-i18next i18next`
- [x] Install next-intl: `npm install next-intl`
- [x] Delete `next-i18next.config.js`
- [x] Remove i18n config from `next.config.ts`

### 3. Translation Infrastructure ✅
- [x] Create `lib/translations.ts` with:
  - [x] Environment detection logic
  - [x] HTTP fetching for production
  - [x] Local file loading for dev/test
  - [x] Caching mechanism
  - [x] Error handling
- [x] Create translation files in `public/locales/de/`:
  - [x] `common.json` - shared translations
  - [x] `navigation.json` - menu, links
  - [x] `forms.json` - form labels, validation
  - [x] `products.json` - product-specific translations

### 4. next-intl Configuration ✅
- [x] Create `i18n/request.ts` with:
  - [x] Static German locale config
  - [x] Dynamic message loading
  - [x] Namespace merging logic
- [x] Update `next.config.ts` with next-intl plugin
- [x] No middleware needed (single language)

### 5. Pages Router Implementation ✅
- [x] Update `pages/_app.tsx` with NextIntlClientProvider
- [x] Create translation loading helpers for getStaticProps/getServerSideProps
- [x] Implement translations in all 3 Pages Router routes
- [x] Test `useTranslations('namespace')` in Pages Router

### 6. App Router Implementation ✅
- [x] Update `app/layout.tsx` with NextIntlClientProvider
- [x] Create App Router pages that coexist with Pages Router
- [x] Implement server-side translation loading
- [x] Test both routers access same translations

### 7. Environment Setup ✅
- [x] Add environment variables:
  - [x] `NEXT_PUBLIC_TRANSLATIONS_BASE_URL`
  - [x] `NODE_ENV` detection
- [x] Create namespace helper functions
- [x] Add error boundaries for translation failures

### 8. Testing & Validation ✅
- [x] Test both routers work simultaneously
- [x] Verify translations load in both environments
- [x] Test namespace isolation
- [x] Ensure no route conflicts
- [x] Test remote vs local loading

## 🎉 SETUP COMPLETE!

The Next.js application now supports:
- Mixed Router architecture (App Router + Pages Router)
- German-only translations via next-intl
- Remote translation loading with local fallback
- Multiple namespaces for organized translations
- Environment-based configuration

## Commands to Remember
- `npm uninstall next-i18next react-i18next i18next`
- `npm install next-intl`
- `npm run dev` to test mixed router setup

## Key Files to Create/Modify
- `pages/_app.tsx`, `pages/_document.tsx`
- `pages/about.tsx`, `pages/contact.tsx`, `pages/products/[id].tsx`
- `lib/translations.ts`
- `i18n/request.ts`
- `public/locales/de/*.json`
- `next.config.ts`
- `app/layout.tsx`