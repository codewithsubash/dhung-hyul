import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { AddAPhotoOutlined, Edit } from "@mui/icons-material";

import InformationTile from "../../../../components/Shared/InformationTile";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import {
  useEditUserProfileMutation,
  useGetUserDetailQuery,
} from "../../../../store/services/userApi";
import InfoGridSkeleton from "../../../../components/Shared/Skeleton/InfoGridSkeleton";
import { useDispatch } from "react-redux";
import { useCloudinaryUploadFile } from "../../../../hooks/useCloudinaryUploadFile";
import { setUser } from "../../../../store/authSlice";

const UserProfileScreen = () => {
  const {
    data: userDetail,
    isLoading: loadingUser,
    isFetching: fetchingUser,
  } = useGetUserDetailQuery();

  const breadcrumbs = [
    {
      title: "My Profile",
    },
  ];

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      isBusy={loadingUser}
      headerActions={<PageActions />}
    >
      <BreadcrumbLayout.Paper>
        {!loadingUser || !fetchingUser ? (
          <Box padding={3}>
            <Grid container spacing={4}>
              <Grid item size={4}>
                <div className="flex flex-col items-center gap-2">
                  <UpdateAvatar
                    avatar={userDetail?.avatar?.url}
                    userProfile={userDetail}
                  />

                  <Typography variant="h6"> {userDetail?.name} </Typography>
                </div>
              </Grid>

              <Grid item size={4}>
                <InformationTile
                  iconName="EmailOutlined"
                  title="Email"
                  subtitle={userDetail?.email}
                />
              </Grid>

              <Grid item size={4}>
                <InformationTile
                  iconName="PhoneOutlined"
                  title="Phone"
                  subtitle={userDetail?.phone}
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <InfoGridSkeleton />
        )}
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default UserProfileScreen;

const UpdateAvatar = ({ avatar = null, userProfile }) => {
  const [avatarPreview, setAvatarPreview] = React.useState(avatar);

  const fileInputRef = React.useRef(null);

  const { handleUploadFiles, uploadingFiles } = useCloudinaryUploadFile();

  const dispatch = useDispatch();

  const NAME_INITIAL = userProfile?.name
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((el) => el?.charAt(0)?.toUpperCase())
    ?.join(" ");

  const [updateProfile, { isLoading: updatingProfile }] =
    useEditUserProfileMutation();

  // methods
  const handleSelectImage = async (e) => {
    const imageFile = e.target.files[0];

    const { uploadedFiles: uploadedAvatar } = await handleUploadFiles(
      [imageFile],
      {
        folderName: "Profile",
      }
    );

    if (!uploadedAvatar[0]) return;

    setAvatarPreview(uploadedAvatar[0]?.url);

    try {
      const updatedProfile = await updateProfile({
        id: userProfile?._id,
        avatar: {
          publicId: uploadedAvatar[0].publicId,
          url: uploadedAvatar[0].secureUrl,
        },
      }).unwrap();

      dispatch(
        setUser({
          ...loggedInUser,
          avatar: updatedProfile?.avatar,
        })
      );

      toast.success("Avatar successfully updated!");
    } catch (error) {
      toast.error(
        error?.data?.message ?? error?.message ?? "Couldn't Upload Avatar!"
      );
    }
  };

  return (
    <div className="group relative h-32 w-32 overflow-hidden rounded-full border-2 p-1">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-50 text-3xl font-medium text-blue-500 dark:bg-transparent dark:text-blue-200">
        {!avatarPreview ? (
          NAME_INITIAL
        ) : (
          <img
            src={avatarPreview}
            alt="Avatar"
            className="h-full w-full rounded-full object-cover"
          />
        )}
      </div>

      {uploadingFiles || updatingProfile ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-30 backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-40">
          <CircularProgress size={26} />
        </div>
      ) : (
        <div className="absolute inset-0 flex translate-y-full items-center justify-center rounded-full bg-gray-200 bg-opacity-30 transition-transform duration-200 ease-in group-hover:translate-y-0 dark:bg-gray-900 dark:bg-opacity-40">
          <IconButton onClick={() => fileInputRef?.current?.click()}>
            <AddAPhotoOutlined />
          </IconButton>
        </div>
      )}

      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        className="hidden"
        onChange={handleSelectImage}
      />
    </div>
  );
};

const PageActions = () => {
  return (
    <Box className="flex gap-6">
      <Link to="/app/me/change-password">
        <Button variant="outlined">Change Password</Button>
      </Link>
      <Link to="/app/me/update">
        <Button startIcon={<Edit />} variant="contained">
          Edit
        </Button>
      </Link>
    </Box>
  );
};
