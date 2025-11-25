import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetEventDetailQuery,
  useUpdateEventMutation,
} from "../../../../store/services/eventApi";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import EventForm from "./EventForm";

const EventEditScreen = () => {
  let { id } = useParams();

  let navigate = useNavigate();

  const breadcrumbs = [
    {
      title: "Events",
      path: "/app/crm/event/list",
    },
    {
      title: "Edit Event",
    },
  ];

  // RTK Query
  const { data: eventDetail, isLoading: loadingEventDetail } =
    useGetEventDetailQuery(id);

  const [updateEvent, { isLoading: updatingEvent }] = useUpdateEventMutation();

  // method
  const handleEventUpdate = (data) => {
    updateEvent(data)
      .unwrap()
      .then(() => {
        navigate(breadcrumbs[0].path);
        toast.success("Event successfully updated!");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      isBusy={loadingEventDetail || updatingEvent}
    >
      <BreadcrumbLayout.Paper>
        <EventForm
          eventDetail={eventDetail}
          isBusy={loadingEventDetail || updatingEvent}
          onSubmit={handleEventUpdate}
        />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default EventEditScreen;
