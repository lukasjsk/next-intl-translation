// Translation loading infrastructure for next-intl
// Supports both local file loading (dev/test) and HTTP loading (production)

type TranslationNamespace = 'common' | 'navigation' | 'forms' | 'products';

interface TranslationData {
  [key: string]: string | TranslationData;
}

interface TranslationCache {
  [namespace: string]: TranslationData;
}

// In-memory cache for loaded translations
const translationCache: TranslationCache = {};

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isClient = typeof window !== 'undefined';

// Base URLs for different environments
const getTranslationBaseUrl = (): string => {
  if (isProduction) {
    return process.env.NEXT_PUBLIC_TRANSLATIONS_BASE_URL || 'https://your-azure-storage.blob.core.windows.net/translations';
  }
  return '/locales';
};

// Load translation from local file (development/test)
const loadTranslationFromFile = async (namespace: TranslationNamespace): Promise<TranslationData> => {
  try {
    if (isClient) {
      // Client-side: fetch from public directory
      const response = await fetch(`/locales/de/${namespace}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${namespace} translations: ${response.status}`);
      }
      return await response.json();
    } else {
      // Server-side: use dynamic import
      const translations = await import(`../../public/locales/de/${namespace}.json`);
      return translations.default || translations;
    }
  } catch (error) {
    console.error(`Error loading local translation for ${namespace}:`, error);
    return {};
  }
};

// Load translation from HTTP endpoint (production)
const loadTranslationFromHttp = async (namespace: TranslationNamespace): Promise<TranslationData> => {
  try {
    const baseUrl = getTranslationBaseUrl();
    const url = `${baseUrl}/de/${namespace}.json`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to load ${namespace} translations from ${url}: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error loading HTTP translation for ${namespace}:`, error);
    
    // Fallback to local file if HTTP fails
    console.log(`Falling back to local file for ${namespace}`);
    return await loadTranslationFromFile(namespace);
  }
};

// Main translation loader function
export const loadTranslation = async (namespace: TranslationNamespace): Promise<TranslationData> => {
  // Check cache first
  if (translationCache[namespace]) {
    return translationCache[namespace];
  }

  let translations: TranslationData;

  if (isProduction) {
    translations = await loadTranslationFromHttp(namespace);
  } else {
    translations = await loadTranslationFromFile(namespace);
  }

  // Cache the loaded translations
  translationCache[namespace] = translations;
  
  return translations;
};

// Load multiple namespaces at once
export const loadTranslations = async (namespaces: TranslationNamespace[]): Promise<TranslationData> => {
  const translationPromises = namespaces.map(namespace => 
    loadTranslation(namespace).then(data => ({ [namespace]: data }))
  );

  const results = await Promise.all(translationPromises);
  
  // Merge all translations into a single object
  return results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

// Clear translation cache (useful for development)
export const clearTranslationCache = (): void => {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
};

// Get available namespaces
export const getAvailableNamespaces = (): TranslationNamespace[] => {
  return ['common', 'navigation', 'forms', 'products'];
};

// Helper for Pages Router - load translations for getStaticProps/getServerSideProps
export const getTranslationsForPages = async (namespaces: TranslationNamespace[] = ['common']) => {
  const translations = await loadTranslations(namespaces);
  return {
    messages: translations,
    locale: 'de',
    timeZone: 'Europe/Berlin'
  };
};

// Helper for App Router - load translations for server components
export const getTranslationsForApp = async (namespaces: TranslationNamespace[] = ['common']) => {
  const translations = await loadTranslations(namespaces);
  return translations;
};