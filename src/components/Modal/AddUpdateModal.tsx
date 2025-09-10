/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addAppeal, updateAppeal } from "@/features/appealSlice";

interface AppealFormProps {
  initialData?: any;
  mode: "add" | "edit";
  onClose: () => void;
}

const AppealForm = ({ initialData = {}, mode, onClose }: AppealFormProps) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    taxYear: "",
    accountNumber: "",
    company: "",
    state: "",
    assessor: "",
    appealedDeadline: "",
    status: "",
    appealedDate: "",
    appealedBy: "",
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        taxYear: initialData.taxYear || "",
        accountNumber: initialData.accountNumber || "",
        company: initialData.company || "",
        state: initialData.state || "",
        assessor: initialData.assessor || "",
        appealedDeadline: initialData.appealedDeadline || "",
        status: initialData.status || "",
        appealedDate: initialData.appealedDate || "",
        appealedBy: initialData.appealedBy || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.taxYear.trim()) newErrors.taxYear = "Tax Year is required.";
    if (!formData.accountNumber.trim())
      newErrors.accountNumber = "Account Number is required.";
    if (!formData.company.trim())
      newErrors.company = "Company name is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.assessor.trim()) newErrors.assessor = "Assessor is required.";
    if (!formData.appealedDeadline.trim())
      newErrors.appealedDeadline = "Appealed Deadline is required.";
    if (!formData.status.trim()) newErrors.status = "Status is required.";
    if (!formData.appealedDate.trim())
      newErrors.appealedDate = "Appealed Date is required.";
    if (!formData.appealedBy.trim())
      newErrors.appealedBy = "Appealed By is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === "add") {
      dispatch(addAppeal(formData));
    } else if (mode === "edit") {
      dispatch(updateAppeal(formData));
    }

    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        minWidth: "400px",
      }}
    >
      <Typography variant="h6">
        {mode === "add" ? "Add New Appeal" : "Edit Appeal"}
      </Typography>

      {[
        { label: "Tax Year", name: "taxYear", type: "date" },
        { label: "Account Number", name: "accountNumber", type: "string" },
        { label: "Company", name: "company", type: "string" },
        { label: "State", name: "state", type: "string" },
        { label: "Assessor", name: "assessor", type: "string" },
        { label: "Appealed Deadline", name: "appealedDeadline", type: "date" },
        { label: "Status", name: "status", type: "dropDown" },
        { label: "Appealed Date", name: "appealedDate", type: "date" },
        { label: "Appealed By", name: "appealedBy", type: "string" },
      ].map((field) =>
        field.type === "dropDown" ? (
          <FormControl
            key={field.name}
            fullWidth
            error={Boolean(errors[field.name])}
          >
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={formData[field.name]}
              onChange={handleSelectChange}
              label={field.label}
            >
              <MenuItem value="Sent">Sent</MenuItem>
              <MenuItem value="Not Sent">Not Sent</MenuItem>
            </Select>
            <FormHelperText>{errors[field.name]}</FormHelperText>
          </FormControl>
        ) : (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            error={Boolean(errors[field.name])}
            helperText={errors[field.name]}
            InputLabelProps={{
              ...(field.type === "date" && { shrink: true }),
            }}
            fullWidth
          />
        )
      )}

      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          type="submit"
          sx={{
            textTransform: "none",
            backgroundColor: "#00bfa5",
            "&:hover": {
              backgroundColor: "#009e87",
            },
          }}
        >
          {mode === "add" ? "Add Appeal" : "Update Appeal"}
        </Button>
      </Box>
    </Box>
  );
};

export default AppealForm;
