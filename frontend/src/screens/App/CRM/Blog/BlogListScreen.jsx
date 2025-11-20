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
import { useLazyGetBlogListQuery } from "../../../../store/services/blogApi";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";

const BlogListScreen = () => {
  const [searchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "Active";
  const page = searchParams.get("page") || 1;
  const perPage = searchParams.get("perPage") || 10;
  const sortDirection = searchParams.get("sortDirection") || -1;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const search = searchParams.get("search") || "";

  const breadcrumbs = [
    {
      title: "Blogs",
    },
  ];

  const blogListTabs = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  // RTK Query
  const [
    listBlogs,
    { data: blogList, isLoading: loadingBlogs, isFetching: fetchingBlogs },
  ] = useLazyGetBlogListQuery();

  React.useEffect(() => {
    listBlogs({
      active: activeTab !== "Inactive",
      page,
      limit: perPage,
      sortBy,
      sortDirection,
      ...(search && { search }),
    });
  }, [activeTab, page, perPage, sortBy, sortDirection, listBlogs, search]);

  return (
    <BreadcrumbLayout breadcrumbs={breadcrumbs} headerActions={<PageActions />}>
      <BreadcrumbLayout.Paper>
        <CustomTabs tabs={blogListTabs} activeTab={activeTab} />

        <AppTable
          columns={columns}
          data={blogList?.data || []}
          progressPending={loadingBlogs || fetchingBlogs}
          paginationServer
          paginationPerPage={perPage}
          paginationTotalRows={blogList?.totalItems ?? 0}
        />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default BlogListScreen;

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
    name: "Author",
    selector: (row) => row?.author,
  },
  {
    name: "Featured",
    selector: (row) => row?.featured,
    cell: (row) =>
      row.isFeatured ? (
        <DoneIcon style={{ color: "green" }} />
      ) : (
        <CloseIcon style={{ color: "red" }} />
      ),
    sortable: true,
  },

  {
    name: "Tags",
    selector: (row) => row.tags,
  },
  {
    name: "Actions",
    cell: (row) => (
      <>
        <Link to={`/app/crm/blog/${row._id}/detail`}>
          <IconButton size="small" aria-label="View Blog">
            <InfoOutlined color="primary" />
          </IconButton>
        </Link>
        <Link to={`/app/crm/blog/${row._id}/edit`}>
          <IconButton size="small" aria-label="Edit Blog">
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
      <Link to="/app/crm/blog/create">
        <Button startIcon={<AddIcon />} variant="contained">
          New Blog
        </Button>
      </Link>
    </div>
  );
};
