import { Route, Routes } from "react-router-dom";
import NotFoundScreen from "../../screens/NotFoundScreen";
import UserCreateScreen from "../../screens/App/CRM/User/CRM_USER/UserCreateScreen";
import UserListScreen from "../../screens/App/CRM/User/CRM_USER/UserListScreen";
import UserEditScreen from "../../screens/App/CRM/User/CRM_USER/UserEditScreen";
import UserDetailScreen from "../../screens/App/CRM/User/CRM_USER/UserDetailScreen";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="create" element={<UserCreateScreen />} />
      <Route path="list" element={<UserListScreen />} />
      <Route path=":id/edit" element={<UserEditScreen />} />
      <Route path=":id/detail" element={<UserDetailScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default UserRouter;
