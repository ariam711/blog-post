import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { memo, useCallback } from 'react';

/**
 * Notification component to display alerts based on the application state.
 */
const Notification = () => {
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state) => state.posts);

  const onClose = useCallback(() => {
    /**
     * Handles the close event of the Snackbar.
     * Dispatches an action to reset the message in the posts state.
     */
    dispatch({ type: 'posts/resetMessage' });
  }, []);

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
    >
      {message ? (
        <Alert severity={status as AlertColor} sx={{ width: '100%' }} variant="filled">
          {message}
        </Alert>
      ) : (
        <div />
      )}
    </Snackbar>
  );
};

export default memo(Notification);
