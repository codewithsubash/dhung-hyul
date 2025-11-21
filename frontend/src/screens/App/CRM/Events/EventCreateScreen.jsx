import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateEventMutation } from "../../../../store/services/eventApi";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import EventForm from "./EventForm";

const EventCreateScreen = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      title: "Events",
      path: "/app/crm/event/list",
    },
    {
      title: "New Event",
    },
  ];

  // RTK Query
  const [createEvent, { isLoading: creatingEvent }] = useCreateEventMutation();

  // methods
  const handleEventCreate = (data) => {
    createEvent(data)
      .unwrap()
      .then(() => {
        navigate(breadcrumbs[0].path);
        toast.success("Event created successfully");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <>
      <BreadcrumbLayout breadcrumbs={breadcrumbs} isBusy={creatingEvent}>
        <BreadcrumbLayout.Paper>
          <EventForm isBusy={creatingEvent} onSubmit={handleEventCreate} />
        </BreadcrumbLayout.Paper>
      </BreadcrumbLayout>
    </>
  );
};

export default EventCreateScreen;
