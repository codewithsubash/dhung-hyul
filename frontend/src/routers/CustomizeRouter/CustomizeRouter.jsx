import { Route, Routes } from "react-router-dom";
import ListComponent from "../../screens/App/CRM/List/ListComponent";
import NotFoundScreen from "../../screens/NotFoundScreen";
import ListDetailScreen from "../../screens/App/CRM/List/ListDetailScreen";

const CustomizeRouter = () => {
  return (
    <Routes>
      <Route path="list" element={<ListComponent />} />
      <Route path="detail" element={<ListDetailScreen />} />

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default CustomizeRouter;
