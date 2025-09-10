import { Box, Dialog } from "@mui/material";
import React, { ReactElement } from "react";
import RenderModalComponent from "./RenderModalComponent";

export interface SimpleDialogProps {
  open: boolean;
  children: ReactElement;
  onClose: (value: string) => void;
  styles?: Record<string, string | number>;
}

const ModalComponent = ({ open, onClose, styles }: SimpleDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          // width: 500,
          // height: 1200,
          padding: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...styles,
        }}
      >
        <RenderModalComponent />
      </Box>
    </Dialog>
  );
};

export default ModalComponent;
