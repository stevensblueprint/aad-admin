import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { type PropsWithChildren } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  action?: string;
  confirm: (yes: boolean) => void;
}
const ConfirmDialog = ({
  open,
  title,
  action,
  children,
  confirm,
}: PropsWithChildren<ConfirmDialogProps>) => {
  return (
    <Dialog open={open} onClose={() => confirm(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {action && (
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={() => confirm(true)}>{action}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
export default ConfirmDialog;
