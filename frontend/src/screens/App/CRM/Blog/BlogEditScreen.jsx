import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetBlogDetailQuery,
  useUpdateBlogMutation,
} from "../../../../store/services/blogApi";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import BlogForm from "./BlogForm";

const BlogEditScreen = () => {
  let { id } = useParams();

  let navigate = useNavigate();

  const breadcrumbs = [
    {
      title: "Blogs",
      path: "/app/crm/blog/list",
    },
    {
      title: "Edit Blog",
    },
  ];

  // RTK Query
  const { data: blogDetail, isLoading: loadingBlogDetail } =
    useGetBlogDetailQuery(id);

  const [updateBlog, { isLoading: updatingBlog }] = useUpdateBlogMutation();

  // method
  const handleBlogUpdate = (data) => {
    updateBlog(data)
      .unwrap()
      .then(() => {
        navigate(breadcrumbs[0].path);
        toast.success("Blog successfully updated!");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      isBusy={loadingBlogDetail || updatingBlog}
    >
      <BreadcrumbLayout.Paper>
        <BlogForm
          blogDetail={blogDetail}
          isBusy={loadingBlogDetail || updatingBlog}
          onSubmit={handleBlogUpdate}
        />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default BlogEditScreen;
