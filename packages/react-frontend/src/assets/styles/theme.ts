import { createTheme } from '@mui/material';

export const colorStyles = {
  red: '#ea4545',
  redLight: '#dd343447',
  greyDark: '#e8e8e8',
  greyLight: '#fbfbfb',
  green: '#60c441',
  orange: '#ffb938',
  marine: '#22bfef',
  textDark: '#000000de',
};

export const theme = createTheme({
  palette: {},
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: colorStyles.greyLight,
          boxShadow: 'none',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: colorStyles.green,
          boxShadow: 'none',
          '&:hover': {
            background: colorStyles.green,
          },
        },
      },
    },
  },
});
