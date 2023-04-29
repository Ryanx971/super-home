import { ThemeProvider } from '@emotion/react';
import { StoryFn } from '@storybook/react';
import React from 'react';
import theme from '../../src/utils/theme';

export const withMuiTheme = (Story: StoryFn) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

