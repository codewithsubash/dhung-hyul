import React from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { BaseDrawer } from "../../../../components/Shared/Base/BaseDrawer/BaseDrawer";

const ListForm = ({
  initialData = null,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      status: initialData?.status || "Active",
    },
  });

  React.useEffect(() => {
    reset({
      name: initialData?.name || "",
      status: initialData?.status || "Active",
    });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseDrawer.Header>
        <Typography variant="h6" mb={2}>
          {initialData ? "Edit Option" : "New Option"}
        </Typography>
      </BaseDrawer.Header>

      <BaseDrawer.Content>
        {/* NAME */}
        <Controller
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        {/* STATUS */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </BaseDrawer.Content>

      <BaseDrawer.Actions>
        <Button onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </BaseDrawer.Actions>
    </form>
  );
};

export default ListForm;
