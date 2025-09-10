/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { formatKeyValuePairs } from "@/utils/formattedObject";
import { closeModalStore } from "@/features/userSlice";

const ViewModal = () => {
  const dispatch = useDispatch();
  const selectModalData: any = useSelector(
    (state: RootState) => state?.user?.modalStore?.data
  );

  const formattedData = formatKeyValuePairs(selectModalData.formData);
  const handleClose = () => {
    dispatch(closeModalStore());
    selectModalData.callBack();
  };

  return (
    <Stack gap={5}>
      <Stack gap={1}>
        {formattedData.map((item, index) => (
          <Typography key={index}>
            <strong>{item?.key}:</strong> {item?.value}
          </Typography>
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={handleClose}
        sx={{
          textTransform: "none",
          backgroundColor: "#00bfa5",
          "&:hover": {
            backgroundColor: "#009e87",
          },
        }}
      >
        Close
      </Button>
    </Stack>
  );
};

export default ViewModal;
