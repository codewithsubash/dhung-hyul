import { Route, Routes } from "react-router-dom";

import NotFoundScreen from "../../screens/NotFoundScreen";
import EventCreateScreen from "../../screens/App/CRM/Events/EventCreateScreen";
import EventListScreen from "../../screens/App/CRM/Events/EventListScreen";
import EventEditScreen from "../../screens/App/CRM/Events/EventEditScreen";
import EventDetailScreen from "../../screens/App/CRM/Events/EventDetailScreen";

const EventRouter = () => {
  return (
    <Routes>
      <Route path="create" element={<EventCreateScreen />} />
      <Route path="list" element={<EventListScreen />} />
      <Route path=":id/edit" element={<EventEditScreen />} />
      <Route path=":id/detail" element={<EventDetailScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default EventRouter;
