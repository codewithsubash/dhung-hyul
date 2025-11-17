import { useSearchParams } from "react-router-dom";
import { useGetUrlParams } from "./useGetUrlParams";

export const useTablePagination = (defaultPageSize = 10) => {
  const URL_PARAMS = useGetUrlParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;

  const perPage = searchParams.get("perPage")
    ? parseInt(searchParams.get("perPage"))
    : defaultPageSize;

  const handlePageChange = (page) => setSearchParams({ ...URL_PARAMS, page });

  const handlePerRowsChange = (perPage) =>
    setSearchParams({ ...URL_PARAMS, page: 1, perPage });

  return {
    page,
    currentPage: page,
    perPage,
    handlePageChange,
    handlePerRowsChange,
  };
};
