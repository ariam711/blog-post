import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, memo } from 'react';

/**
 * Props for the ConfirmationDialog component.
 *
 * @interface ConfirmationDialogProps
 * @property {boolean} open - Whether the dialog is open.
 * @property {string} title - The title of the dialog.
 * @property {string} content - The content of the dialog.
 * @property {() => void} onConfirm - Callback function to handle confirmation.
 * @property {() => void} onCancel - Callback function to handle cancellation.
 */
interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ open, title, content, onConfirm, onCancel }) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" color="info" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" color="warning" onClick={onConfirm} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default memo(ConfirmationDialog);
