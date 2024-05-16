import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  close?: (accept: boolean) => void;
  title: string;
  content: string;
  action: string;
}
const ConfirmDialog = ({
  open,
  close,
  title,
  content,
  action,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close && close(false)}>Cancel</Button>
        <Button onClick={() => close && close(true)}>{action}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
