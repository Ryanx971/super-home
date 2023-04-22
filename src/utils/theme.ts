import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    white: string;
    yellow: string;
    red: string;
    black: string;
    lightGrey: string;
    grey20: string;
    grey30: string;
    grey40: string;
    primaryGrey: string;
  }
  interface PaletteOptions {
    white: string;
    yellow: string;
    red: string;
    black: string;
    lightGrey: string;
    grey20: string;
    grey30: string;
    grey40: string;
    primaryGrey: string;
  }
}

const palette = {
  primary: { main: '#5e44ff', light: '#f7f6ff' },
  secondary: { main: '#006C7F' },
  white: '#ffffff',
  red: '#d32f2f',
  yellow: '#fbe122',
  black: '#000000',
  lightGrey: '#f3f3f3',
  grey20: '#e7e7e7',
  grey30: '#dcdcdc',
  grey40: '#d0d0d0',
  primaryGrey: '#c4c4c4',
};

const theme = createTheme({
  palette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          paddingTop: 10,
          paddingBottom: 10,
          width: '100%',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          label: {
            color: palette.primary.main,
          },

          '&:hover': {
            borderColor: palette.primary.main,
          },

          fieldset: {
            borderColor: palette.primary.main,
          },

          '& .MuiOutlinedInput-root': {
            color: palette.primary.main,
            fontWeight: 500,

            '&:hover': {
              borderColor: palette.primary.main,

              fieldset: {
                borderColor: palette.primary.main,
              },
            },
          },

          // handle error
          '& .Mui-error': {
            color: palette.red,
            fontWeight: 500,

            '&:hover': {
              fieldset: {
                borderColor: palette.red,
              },
            },
          },
        },
      },
    },
  },
});

export default theme;

