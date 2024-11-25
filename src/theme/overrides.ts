import { ThemeOptions } from '@mui/material/styles';

/**
 * Overrides for Material-UI components.
 *
 * @type {ThemeOptions['components']}
 */
export const overrides: ThemeOptions['components'] = {
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        }
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: '8px',
        border: '1px solid',
        borderRadius: '4px',
        '& svg': { fontSize: 20 },
        '&:hover': { background: 'unset' }
      }
    }
  }
};
