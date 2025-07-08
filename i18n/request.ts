import { getRequestConfig } from 'next-intl/server';
import { getTranslationsForApp } from '@/lib/translations';

export default getRequestConfig(async () => {
  // Static German locale - no URL routing
  const locale = 'de';
  
  // Load default translations (common namespace)
  // Additional namespaces can be loaded per component as needed
  const messages = await getTranslationsForApp(['common']);

  return {
    locale,
    messages,
    timeZone: 'Europe/Berlin'
  };
});