'use client';

import { typography } from '@/theme/typography';
import { createTheme, Theme } from '@mui/material/styles';
import { overrides } from './overrides';
import { palette } from './palette';

/**
 * Creates and exports the theme for the application.
 *
 * @type {Theme}
 */
export const theme: Theme = createTheme({
  palette,
  typography,
  components: overrides
});
