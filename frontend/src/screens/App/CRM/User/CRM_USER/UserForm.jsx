import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import BaseCheckbox from "../../../../../components/Shared/Base/BaseCheckbox";
import { BASE_CONSTANTS } from "../../../../../constants/baseConstant";
import BaseSelect from "../../../../../components/Shared/Base/BaseSelect";
import { formHookInputHelper } from "../../../../../utils/formHookInputHelper";
import BaseTextField from "../../../../../components/Shared/Base/BaseTextField";
import LoadingWrapper from "../../../../../components/Shared/Loading/LoadingWrapper";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  role: "",
  autoGeneratePassword: true,
  password: "",
  confirmPassword: "",
  isActive: true,
};

const UserForm = ({
  userDetail = null,
  isBusy = false,
  onSubmit = () => {},
}) => {
  const navigate = useNavigate();

  // react form hook
  const formMethods = useForm({
    defaultValues: {
      ...INITIAL_STATE,
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = formMethods;

  // methods
  const handleOnUserSubmit = (data) => {
    onSubmit(data);
  };

  React.useEffect(() => {
    if (!userDetail) return;
    reset({
      name: userDetail?.name,
      email: userDetail?.email,
      phone: userDetail?.phone,
      role: userDetail?.role,
      isActive: userDetail.isActive,
    });
  }, [reset, userDetail]);

  return (
    <LoadingWrapper loading={isBusy}>
      <FormProvider {...{ ...formMethods, userDetail }}>
        <Box padding={3}>
          <Grid container spacing={5}>
            <Grid item size={6}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Please provide a Name.",
                  maxLength: { value: 100, message: "Max 100 characters." },
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    fullWidth
                    label="Name"
                    placeholder="Enter name"
                  />
                )}
              />
            </Grid>

            <Grid item size={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please provide a Email.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    fullWidth
                    required
                    label="Email"
                    placeholder="Please provide an Email."
                  />
                )}
              />
            </Grid>
            <Grid item size={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Phone"
                    placeholder="Enter Contact Number"
                    size="small"
                    type="tel"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item size={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Please select status" }}
                render={(props) => (
                  <BaseSelect
                    {...formHookInputHelper(props)}
                    required
                    label="Role"
                    options={["System", "SuperAdmin", "Member"]}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid size={6}>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        {...field}
                        color="primary"
                      />
                    }
                    label="Is Active?"
                  />
                )}
              />
            </Grid>

            <Password />
          </Grid>

          <Divider sx={{ mt: 2 }} />
          <Box
            paddingX={3}
            paddingY={2}
            gap={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={() => navigate(-1)}>Cancel</Button>

            <Button
              variant="contained"
              onClick={handleSubmit(handleOnUserSubmit)}
            >
              {userDetail ? "Update" : "Add"}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </LoadingWrapper>
  );
};

export default UserForm;

const Password = () => {
  const { userDetail, control, watch } = useFormContext();

  if (userDetail) return null;

  return (
    <Grid item size={12}>
      <Grid
        container
        rowSpacing={BASE_CONSTANTS.SPACING_SM}
        columnSpacing={BASE_CONSTANTS.SPACING_LG}
      >
        <Grid item size={12}>
          <Controller
            name="autoGeneratePassword"
            control={control}
            render={({ field }) => (
              <BaseCheckbox
                {...field}
                checked={field.value}
                label="Auto Generate Password"
              />
            )}
          />
        </Grid>

        {!watch("autoGeneratePassword") && (
          <>
            <Grid item size={6}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Please provide Password.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    required
                    fullWidth
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                  />
                )}
              />
            </Grid>

            <Grid item size={6}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please Confirm Password.",
                  validate: (value) =>
                    value === watch("password") ||
                    "The passwords do not match.",
                }}
                render={(props) => (
                  <BaseTextField
                    {...formHookInputHelper(props)}
                    fullWidth
                    required
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                  />
                )}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};
