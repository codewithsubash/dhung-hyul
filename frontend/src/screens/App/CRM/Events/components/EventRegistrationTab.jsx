import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { PersonAdd, DeleteOutline } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";

import { BaseDrawer } from "../../../../../components/Shared/Base/BaseDrawer/BaseDrawer";
import EventRegistrationForm from "./EventRegistrationForm";
import BreadcrumbLayout from "../../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import TableFilter from "../../../../../components/Shared/TableFilter/TableFilter";
import HighlightedText from "../../../../../components/Shared/HighlightedText";
import AppTableDateTimeMoment from "../../../../../components/Shared/AppTable/AppTableDateTimeMoment";
import AppTable from "../../../../../components/Shared/AppTable/AppTable";
import {
  useCreateEventRegistrationMutation,
  useDeleteRegisterUserMutation,
  useLazyGetEventRegistrationListQuery,
} from "../../../../../store/services/eventRegistrationApi";
import AppConfirmDialog from "../../../../AppConfirmDialog";

const EventRegistrationTab = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;

  const [createRegisterUser, { isLoading: creatingRegisterUser }] =
    useCreateEventRegistrationMutation();

  const search = searchParams.get("search") || "";

  const [
    listRegisterUser,
    {
      data: RegisterUserList,
      isLoading: loadingRegisterUser,
      isFetching: fetchingRegisterUser,
    },
  ] = useLazyGetEventRegistrationListQuery();

  const [deleteUser, { isLoading: deletingUser }] =
    useDeleteRegisterUserMutation();

  React.useEffect(() => {
    listRegisterUser({
      page,
      limit: perPage,
      eventId: id,
      search: search,
    });
  }, [id, listRegisterUser, page, perPage, search]);

  const handleRegisterSubmit = async (payload) => {
    try {
      await createRegisterUser(payload).unwrap();
      toast.success("User registered successfully");
      setShowRegisterForm(false);
    } catch (err) {
      toast.error(
        err?.data?.message ?? err?.message ?? "Couldn't register user!"
      );
    }
  };

  const handleDeleteClick = (row) => {
    setUserInfo(row);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser({
        eventId: id,
        userId: userInfo?.user?._id,
      }).unwrap();
      toast.success("User removed from event successfully");
      setDeleteConfirm(false);
    } catch (err) {
      toast.error(
        err?.data?.message ?? err?.message ?? "Couldn't remove user!"
      );
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.user?.name,
      cell: (row) => (
        <div title={row?.user?.name} className="line-clamp-2">
          {row?.user?.name ? (
            <HighlightedText text={row?.user?.name} highlight={search} />
          ) : (
            "N/A"
          )}
        </div>
      ),
      minWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row?.user?.email,
      cell: (row) => row?.user?.email,
      minWidth: "100px",
    },
    {
      name: "Register Date",
      selector: (row) => row?.createdAt,
      cell: (row) => <AppTableDateTimeMoment dateOnly date={row?.createdAt} />,
      minWidth: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <IconButton
          size="small"
          aria-label="Delete User"
          onClick={() => {
            setDeleteConfirm(true);
            handleDeleteClick(row);
          }}
          disabled={deletingUser}
        >
          <DeleteOutline color="error" />
        </IconButton>
      ),
      ignoreRowClick: true,
      right: true,
      minWidth: "80px",
    },
  ];

  return (
    <>
      <BreadcrumbLayout.Paper>
        <div className="flex items-center justify-between px-2">
          <TableFilter searchLabel="Student Name" />
          <button
            className="ml-4 mr-4 flex items-center rounded bg-blue-600 px-6 py-2.5 text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => setShowRegisterForm(true)}
          >
            <PersonAdd className="mr-2 h-5 w-5" />
            Register User
          </button>
        </div>

        <Divider />
        <AppTable
          columns={columns}
          data={RegisterUserList?.data}
          progressPending={loadingRegisterUser || fetchingRegisterUser}
          paginationServer
          paginationPerPage={perPage}
          paginationTotalRows={RegisterUserList?.totalItems ?? 0}
        />
      </BreadcrumbLayout.Paper>

      <BaseDrawer
        title="Register Student"
        open={showRegisterForm}
        onClose={() => setShowRegisterForm(false)}
      >
        <EventRegistrationForm
          isBusy={creatingRegisterUser}
          onSubmit={handleRegisterSubmit}
          onCancel={() => setShowRegisterForm(false)}
        />
      </BaseDrawer>

      <AppConfirmDialog
        maxWidth="sm"
        title="Confirm Delete"
        open={deleteConfirm}
        loading={deletingUser}
        onClose={() => setDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        loadingText="Deleting User..."
      >
        {`Are you sure you want to remove "${userInfo?.user?.name}" from this event?`}
      </AppConfirmDialog>
    </>
  );
};

export default EventRegistrationTab;
