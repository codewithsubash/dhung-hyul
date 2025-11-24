import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserForm from "./UserForm";
import {
  useGetSpecificUserDetailQuery,
  useUpdateUserMutation,
} from "../../../../../store/services/userApi";
import BreadcrumbLayout from "../../../../../components/Shared/BreadCrumb/BreadcrumbLayout";

const UserEditScreen = () => {
  let { id } = useParams();

  let navigate = useNavigate();

  const breadcrumbs = [
    {
      title: "Users",
      path: "/app/crm/user/list",
    },
    {
      title: "Edit User",
    },
  ];

  // RTK Query
  const { data: userDetail, isLoading: loadingUserDetail } =
    useGetSpecificUserDetailQuery(id);

  const [updateUser, { isLoading: updatingUser }] = useUpdateUserMutation();

  // method
  const handleUserUpdate = (data) => {
    updateUser({ ...data, _id: id })
      .unwrap()
      .then(() => {
        navigate(breadcrumbs[0].path);
        toast.success("User successfully updated!");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      isBusy={loadingUserDetail || updatingUser}
    >
      <BreadcrumbLayout.Paper>
        <UserForm
          userDetail={userDetail}
          isBusy={loadingUserDetail || updatingUser}
          onSubmit={handleUserUpdate}
        />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default UserEditScreen;
