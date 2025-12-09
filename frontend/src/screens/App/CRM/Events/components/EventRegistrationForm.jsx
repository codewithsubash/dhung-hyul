import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useGetUserDDLQuery } from "../../../../../store/services/userApi";
import LoadingWrapper from "../../../../../components/Shared/Loading/LoadingWrapper";
import { useParams } from "react-router-dom";
import { BaseDrawer } from "../../../../../components/Shared/Base/BaseDrawer/BaseDrawer";
import BaseAutocomplete from "../../../../../components/Shared/Base/BaseAutocomplete";
import { formHookInputHelper } from "../../../../../utils/formHookInputHelper";

const EventRegistrationForm = ({
  isBusy,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const { id } = useParams();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      user: "",
    },
  });

  const handleUserRegister = async (data) => {
    const payload = { ...data, event: id };

    onSubmit(payload);
  };

  const {
    data: user = [],
    isFetching: fetchingUser,
    isLoading: loadingUser,
  } = useGetUserDDLQuery();

  return (
    <LoadingWrapper loading={isBusy}>
      <BaseDrawer.Header>
        <Typography variant="h6" mb={2}>
          Register User
        </Typography>
      </BaseDrawer.Header>

      <BaseDrawer.Content>
        <Grid size={12}>
          <Controller
            name="user"
            control={control}
            rules={{ required: "Please select a User" }}
            render={(props) => (
              <BaseAutocomplete
                {...formHookInputHelper(props)}
                fullWidth
                required
                label="User"
                onChange={(_, data) => {
                  props?.field?.onChange(data);
                }}
                getOptionLabel={(opt) =>
                  opt ? `${opt.name} - ${opt.email}` : ""
                }
                isOptionEqualToValue={(opt, value) => opt._id === value._id}
                options={user || []}
                loading={loadingUser || fetchingUser}
                loadingText="Loading User..."
              />
            )}
          />
        </Grid>
      </BaseDrawer.Content>

      <BaseDrawer.Actions>
        <Button onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          onClick={handleSubmit(handleUserRegister)}
        >
          Register
        </Button>
      </BaseDrawer.Actions>
    </LoadingWrapper>
  );
};

export default EventRegistrationForm;
