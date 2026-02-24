import { createTheme } from '@mui/material/styles'
import { themeColors as colors } from './themeColors.js'

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.secondary,
      dark: '#4a9f9f',
      contrastText: colors.textInverse,
    },
    secondary: {
      main: colors.secondary,
      light: '#a3d4cd',
      dark: '#6a9a93',
      contrastText: colors.textInverse,
    },
    error: {
      main: colors.error,
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: colors.warning,
      light: '#fbbf24',
      dark: '#d97706',
    },
    success: {
      main: colors.success,
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: colors.primary,
      light: colors.secondary,
      dark: '#4a9f9f',
    },
    accent: {
      main: colors.accent,
      light: '#fbbf24',
      dark: '#d97706',
    },
    orange: {
      main: colors.orange,
      light: '#f0a68a',
      dark: '#d66b47',
    },
    background: {
      default: colors.bgSecondary,
      paper: colors.bgCard,
    },
    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
      disabled: colors.textMuted,
    },
    custom: {
      bgSolid: colors.bgSolid,
      bgSecondary: colors.bgSecondary,
      bgTertiary: colors.bgTertiary,
      bgCard: colors.bgCard,
      bgOverlay: colors.bgOverlay,
      bgLogin: colors.bgLogin,
      bgGradient: colors.bgGradient,
      bgOrangeGradient: colors.bgOrangeGradient,
    },
    textCustom: {
      teal: colors.textTeal,
      inverse: colors.textInverse,
    },
    border: {
      main: colors.border,
      secondary: colors.borderSecondary,
      accent: colors.borderAccent,
      orange: colors.borderOrange,
    },
    button: {
      yellow: colors.btnYellow,
      teal: colors.btnTeal,
      orange: colors.btnOrange,
    },
  },
  typography: {
    fontFamily: [
      'Quicksand',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: colors.text,
    },
    h2: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: colors.text,
    },
    h3: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      color: colors.text,
    },
    h4: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: colors.text,
    },
    h5: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: colors.text,
    },
    h6: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: colors.text,
    },
    body1: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.text,
    },
    body2: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: colors.textSecondary,
    },
    button: {
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary,
          color: colors.textInverse,
          '&:hover': {
            backgroundColor: '#4a9f9f',
          },
        },
        containedSecondary: {
          backgroundColor: colors.secondary,
          color: colors.textInverse,
          '&:hover': {
            backgroundColor: '#6a9a93',
          },
        },
      },
      variants: [
        {
          props: { variant: 'accent' },
          style: {
            backgroundColor: colors.accent,
            color: colors.textInverse,
            '&:hover': {
              backgroundColor: '#d97706',
            },
          },
        },
        {
          props: { variant: 'orange' },
          style: {
            backgroundColor: colors.orange,
            color: colors.textInverse,
            '&:hover': {
              backgroundColor: '#d66b47',
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgCard,
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.border}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            fontFamily: 'Quicksand, sans-serif',
            borderRadius: 8,
            '& fieldset': {
              borderColor: colors.border,
            },
            '&:hover fieldset': {
              borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgCard,
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bgCard,
          color: colors.text,
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
})

