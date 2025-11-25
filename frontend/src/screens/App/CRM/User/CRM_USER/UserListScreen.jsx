import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar, Button, IconButton } from "@mui/material";
import { Add, InfoOutlined, ModeEditOutlineTwoTone } from "@mui/icons-material";

import { useTablePagination } from "../../../../../hooks/useTablePagination";
import { useLazyGetUserListQuery } from "../../../../../store/services/userApi";
import CustomTabs from "../../../../../components/Shared/CustomTabs";
import HighlightedText from "../../../../../components/Shared/HighlightedText";
import TableFilter from "../../../../../components/Shared/TableFilter/TableFilter";
import BreadcrumbLayout from "../../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import AppTable from "../../../../../components/Shared/AppTable/AppTable";

const UserListScreen = () => {
  const { currentPage, perPage, handlePageChange, handlePerRowsChange } =
    useTablePagination();

  const [searchParams] = useSearchParams();
  const role = searchParams.get("tab") || "System";

  const search = searchParams.get("search") || "";

  const breadcrumbs = [
    {
      title: "Users",
    },
  ];

  const userListTabs = [
    { label: "System", value: "System" },
    { label: "Member", value: "Member" },
  ];

  const columns = [
    {
      cell: (row) => (
        <Avatar src={row?.avatar?.url} sx={{ width: 30, height: 30 }} />
      ),
      width: "50px",
    },

    {
      name: "Name",
      selector: (row) => row.name,
      cell: (row) => (
        <Link
          title={row?.name}
          to={`/app/crm/user/${row._id}/detail`}
          className="line-clamp-2 hover:text-blue-600 hover:underline dark:hover:text-blue-300"
        >
          {row?.name ? (
            <HighlightedText text={row?.name} highlight={search} />
          ) : (
            "N/A"
          )}
        </Link>
      ),
    },

    {
      name: "Email",
      selector: (row) => row?.email,
      cell: (row) => (
        <a
          href={`mailto:${row?.email}`}
          className="hover:text-blue-600 hover:underline dark:hover:text-blue-300"
        >
          {row?.email ? (
            <HighlightedText text={row?.email} highlight={search} />
          ) : (
            "N/A"
          )}
        </a>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row?.phone,
    },
    {
      name: "Role",
      selector: (row) => row?.role,
    },

    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/app/crm/user/${row._id}/detail`}>
            <IconButton size="small" aria-label="View User" color="primary">
              <InfoOutlined />
            </IconButton>
          </Link>
          <Link to={`/app/crm/user/${row._id}/edit`}>
            <IconButton size="small" aria-label="Edit User">
              <ModeEditOutlineTwoTone />
            </IconButton>
          </Link>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // RTK Query
  const [
    fetchUsers,
    { data: userRes, isLoading: loadingUsers, isFetching: fetchingUsers },
  ] = useLazyGetUserListQuery();

  React.useEffect(() => {
    fetchUsers({
      page: currentPage,
      limit: perPage,
      role,
      ...(search && { search }),
    });
  }, [role, currentPage, fetchUsers, search, perPage]);

  const isBusy = loadingUsers || fetchingUsers;

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      headerActions={<PageActions />}
      isBusy={isBusy}
    >
      <BreadcrumbLayout.Paper>
        <CustomTabs tabs={userListTabs} defaultValue={role} />
        <TableFilter searchLabel="Name/Email" disabled={isBusy}>
          <div className="font-medium"> Users </div>
        </TableFilter>

        <AppTable
          columns={columns}
          data={userRes?.data ?? []}
          progressPending={isBusy}
          paginationServer
          paginationPerPage={perPage}
          paginationTotalRows={userRes?.totalItems ?? 0}
          paginationDefaultPage={currentPage}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default UserListScreen;

const PageActions = () => {
  return (
    <Link to="/app/crm/user/create?typeRefSource=User">
      <Button startIcon={<Add />} variant="contained">
        New User
      </Button>
    </Link>
  );
};
