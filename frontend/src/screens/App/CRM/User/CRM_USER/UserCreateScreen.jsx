import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAddUserMutation } from "../../../../../store/services/userApi";
import BreadcrumbLayout from "../../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import UserForm from "./UserForm";

const UserCreateScreen = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      title: "Users",
      path: "/app/crm/user/list",
    },
    { title: "New User" },
  ];

  // RTK Query
  const [createUser, { isLoading: creatingUser }] = useAddUserMutation();

  // methods
  const handleCreateUser = async (data) => {
    try {
      const user = await createUser(data).unwrap();
      toast.success("User successfully added!");
      navigate(`/app/crm/user/${user?._id}/detail`);
    } catch (err) {
      toast.error(
        err?.data?.message ?? err?.message ?? "Couldn't create user!"
      );
    }
  };

  return (
    <BreadcrumbLayout breadcrumbs={breadcrumbs} isBusy={creatingUser}>
      <BreadcrumbLayout.Paper>
        <UserForm isBusy={creatingUser} onSubmit={handleCreateUser} />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default UserCreateScreen;
