import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";

import AppTable from "../../../../components/Shared/AppTable/AppTable";
import CustomTabs from "../../../../components/Shared/CustomTabs";
import { useLazyGetEventListQuery } from "../../../../store/services/eventApi";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import AppTableDateTimeMoment from "../../../../components/Shared/AppTable/AppTableDateTimeMoment";

const EventListScreen = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("tab") || "Draft";
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;
  const sortDirection = searchParams.get("sortDirection") || -1;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const search = searchParams.get("search") || "";

  const breadcrumbs = [
    {
      title: "Events",
    },
  ];

  const eventListTabs = [
    { label: "Draft", value: "Draft" },
    { label: "Published", value: "Published" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "Completed", value: "Completed" },
  ];

  // RTK Query
  const [
    listEvents,
    { data: eventList, isLoading: loadingEvents, isFetching: fetchingEvents },
  ] = useLazyGetEventListQuery();

  React.useEffect(() => {
    listEvents({
      status,
      page,
      limit: perPage,
      sortBy,
      sortDirection,
      ...(search && { search }),
    });
  }, [status, page, perPage, sortBy, sortDirection, listEvents, search]);

  return (
    <BreadcrumbLayout breadcrumbs={breadcrumbs} headerActions={<PageActions />}>
      <BreadcrumbLayout.Paper>
        <CustomTabs tabs={eventListTabs} activeTab={status} />

        <AppTable
          columns={columns}
          data={eventList?.data || []}
          progressPending={loadingEvents || fetchingEvents}
          paginationServer
          paginationPerPage={perPage}
          paginationTotalRows={eventList?.totalItems ?? 0}
        />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default EventListScreen;

const columns = [
  {
    name: "Image",
    cell: (row) => (
      <a href={row?.image?.secureUrl} target="_blank" rel="noreferrer">
        <img
          src={`${row?.image?.secureUrl}?w=248&h=248fit=crop&auto=format`}
          style={{
            height: 60,
            width: 60,
            borderRadius: ".25rem",
            border: "1px solid lightgray",
            objectFit: "cover",
            marginTop: ".25rem",
          }}
          alt={row?.title}
        />
      </a>
    ),
  },
  {
    name: "Title",
    selector: (row) => row?.title,
    cell: (row) => (
      <div title={row?.title} className="line-clamp-2">
        {row?.title}{" "}
      </div>
    ),
    minWidth: "250px",
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row?.status,
  },

  {
    name: "Category",
    selector: (row) => row.category.name,
  },
  {
    name: "Location",
    selector: (row) => row.location,
  },
  {
    name: "Start date",
    selector: (row) => row?.startDate,
    cell: (row) => <AppTableDateTimeMoment date={row?.startDate} />,
    minWidth: "150px",
  },
  {
    name: "End date",
    selector: (row) => row?.endDate,
    cell: (row) => <AppTableDateTimeMoment date={row?.endDate} />,
    minWidth: "150px",
  },
  {
    name: "Actions",
    cell: (row) => (
      <>
        <Link to={`/app/crm/event/${row._id}/detail`}>
          <IconButton size="small" aria-label="View Event">
            <InfoOutlined color="primary" />
          </IconButton>
        </Link>
        <Link to={`/app/crm/event/${row._id}/edit`}>
          <IconButton size="small" aria-label="Edit Event">
            <ModeEditOutlineTwoToneIcon />
          </IconButton>
        </Link>
      </>
    ),
    ignoreRowClick: true,
    right: true,
  },
];

const PageActions = () => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to="/app/crm/event/create">
        <Button startIcon={<AddIcon />} variant="contained">
          New Event
        </Button>
      </Link>
    </div>
  );
};
