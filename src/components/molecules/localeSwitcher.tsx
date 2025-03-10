'use client';

import { useRouter, usePathname } from 'next/navigation';
import { supportedLocales } from '@/utils/config-loader';

interface LocaleSwitcherProps {
  currentLocale: string;
}

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({ currentLocale }) => {
  const router = useRouter();
  const pathname = usePathname();

  // More consistent way to handle paths that works with SSR and CSR
  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    
    // Parse the current path to get the segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Replace the locale segment (first segment) or add it if not present
    if (segments.length > 0 && supportedLocales.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    
    // Reconstruct the path
    const newPath = `/${segments.join('/')}`;
    router.push(newPath);
  };

  // Language names in their native language
  const localeNames: Record<string, string> = {
    en: 'English',
    vi: 'Tiếng Việt'
  };

  return (
    <div className="flex items-center space-x-2">
      {supportedLocales.map(locale => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`px-2 py-1 text-xs font-medium rounded ${
            locale === currentLocale
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {localeNames[locale] || locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LocaleSwitcher;
