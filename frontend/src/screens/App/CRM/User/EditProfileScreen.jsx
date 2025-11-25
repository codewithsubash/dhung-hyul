import React from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../hooks/useAuth";
import {
  useEditUserProfileMutation,
  useGetUserDetailQuery,
} from "../../../../store/services/userApi";
import { setUser } from "../../../../store/authSlice";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import UserEditForm from "./UserEditForm";

const EditUserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser } = useAuth();

  const breadcrumbs = [
    { title: "My Profile", path: "/app/me" },
    { title: "Edit Profile" },
  ];

  //   RTK Query
  const [updateUserProfile, { isLoading: updatingUserProfile }] =
    useEditUserProfileMutation();

  const {
    data: userDetail,
    isLoading: loadingUser,
    isFetching: fetchingUser,
  } = useGetUserDetailQuery();

  //   methods
  const handleUpdateUserProfile = async (data) => {
    try {
      const updatedUserDetail = await updateUserProfile({
        ...data,
        id: loggedInUser?._id,
      }).unwrap();

      dispatch(
        setUser({
          ...updatedUserDetail,
          token: loggedInUser.token,
        })
      );
      toast.success("Profile successfully updated!");
      navigate(breadcrumbs[0]?.path);
    } catch (err) {
      toast.error(err?.data?.message ?? "Couldn't update profile!");
    }
  };

  return (
    <BreadcrumbLayout breadcrumbs={breadcrumbs} isBusy={updatingUserProfile}>
      <BreadcrumbLayout.Paper>
        <UserEditForm
          userDetail={userDetail}
          isBusy={updatingUserProfile || loadingUser || fetchingUser}
          onSubmit={handleUpdateUserProfile}
        />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default EditUserProfileScreen;
