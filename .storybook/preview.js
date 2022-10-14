import i18n from './i18next.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'en',
  locales: {
    en: { title: 'English', left: '🇺🇸' },
  },
};

const queryClient = new QueryClient();

/**
 * adds a Storybook decorator to get the cache and dev tools showing for each story
 */
export const decorators = [
  (story) => (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  ),
];

