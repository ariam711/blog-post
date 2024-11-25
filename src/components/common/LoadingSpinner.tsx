import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { FC, memo } from 'react';

const LoadingSpinner: FC = () => (
  <Box display="flex" justifyContent="center">
    <CircularProgress />
  </Box>
);

export default memo(LoadingSpinner);
