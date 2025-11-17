import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateBlogMutation } from "../../../../store/services/blogApi";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import BlogForm from "./BlogForm";

const BlogCreateScreen = () => {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      title: "Blogs",
      path: "/app/crm/blog/list",
    },
    {
      title: "New Blog",
    },
  ];

  // RTK Query
  const [createBlog, { isLoading: creatingBlog }] = useCreateBlogMutation();

  // methods
  const handleBlogCreate = (data) => {
    createBlog(data)
      .unwrap()
      .then(() => {
        navigate(breadcrumbs[0].path);
        toast.success("Blog created successfully");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <>
      <BreadcrumbLayout breadcrumbs={breadcrumbs} isBusy={creatingBlog}>
        <BreadcrumbLayout.Paper>
          <BlogForm isBusy={creatingBlog} onSubmit={handleBlogCreate} />
        </BreadcrumbLayout.Paper>
      </BreadcrumbLayout>
    </>
  );
};

export default BlogCreateScreen;
