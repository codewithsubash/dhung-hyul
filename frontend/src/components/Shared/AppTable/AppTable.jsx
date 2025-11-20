import React from "react";
import DataTable from "react-data-table-component";

import TableLoader from "../../../Lottie/TableLoader";
import EmptyResult from "../../../Lottie/EmptyResult";
import { useSidebarLayoutContext } from "../../SidebarLayout/context/SidebarLayoutContext";
import { useTablePagination } from "../../../hooks/useTablePagination";

const AppTable = ({ ...props }) => {
  const { darkMode, theme } = useSidebarLayoutContext();

  const { currentPage, perPage, handlePageChange, handlePerRowsChange } =
    useTablePagination();

  const tablePaginationProps = {
    paginationServer: true,
    paginationPerPage: perPage || 1,
    paginationDefaultPage: currentPage || 10,
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handlePerRowsChange,
  };

  const customStyles = {
    rows: {
      style: {
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  };

  return (
    <DataTable
      pagination
      paginationRowsPerPageOptions={[10, 20, 50, 100]}
      progressComponent={<TableLoader />}
      noDataComponent={<EmptyResult height={200} />}
      persistTableHead={true}
      theme={darkMode ? "dark" : "default"}
      {...{ customStyles, ...tablePaginationProps, ...props }}
    />
  );
};

export default AppTable;
