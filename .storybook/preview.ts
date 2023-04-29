import type { Preview } from '@storybook/react';
import { withMuiTheme } from './decorators/mui.decorator';
import { withI18next } from './decorators/i18n.decorator';

export const decorators = [withMuiTheme, withI18next];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'fr',
    toolbar: {
      icon: 'globe',
      items: [{ value: 'fr', right: '🇫🇷', title: 'Français' }],
      showName: true,
    },
  },
};

export default preview;

