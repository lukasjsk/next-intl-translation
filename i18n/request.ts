import { getRequestConfig } from 'next-intl/server';
import { getTranslationsForApp } from '@/lib/translations';

export default getRequestConfig(async () => {
  // Static German locale - no URL routing
  const locale = 'de';
  
  // Load all namespaces for proper next-intl functionality
  // This ensures all translations are available across the app
  const messages = await getTranslationsForApp(['common', 'navigation', 'forms', 'products']);

  return {
    locale,
    messages,
    timeZone: 'Europe/Berlin'
  };
});