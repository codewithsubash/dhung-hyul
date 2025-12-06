import React, { useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import BlogCard from "./components/BlogCard";
import { useLazyGetPublicBlogListQuery } from "../../../store/services/publicApi";
import CardSkeleton from "./components/CardSkeleton";
import { useGetUrlParams } from "../../../utils/useGetUrlParams";
import { useSearchParams } from "react-router-dom";

// BlogScreen Component
const BlogCardSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const perPage = parseInt(searchParams.get("perPage") || 8);
  const URL_PARAMS = useGetUrlParams();

  const [
    listBlogs,
    { data: blogList, isLoading: loadingBlogs, isFetching: fetchingBlogs },
  ] = useLazyGetPublicBlogListQuery();

  React.useEffect(() => {
    listBlogs({
      page,
      limit: perPage,
    });
  }, [page, perPage, listBlogs]);

  const totalPages = Math.ceil(blogList?.totalItems / perPage) || 1;

  const handlePageChange = (event, value) => {
    setSearchParams({ ...URL_PARAMS, page: value });
  };

  return (
    <div className="relative min-h-screen py-16 px-5 flex flex-col items-center bg-gradient-to-b from-indigo-50 via-green-50 to-green-50 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-100px] left-[-80px] w-72 h-72 bg-indigo-300 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-80px] right-[-100px] w-96 h-96 bg-green-300 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {loadingBlogs || fetchingBlogs
            ? Array.from({ length: blogList?.data?.length }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : blogList?.data?.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
        </div>
      </div>
      <Box className="mt-8 flex flex-col items-center justify-center gap-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
        <Typography variant="body2" color="text.secondary">
          Showing {(page - 1) * perPage + 1} -{" "}
          {Math.min(page * perPage, blogList?.totalItems)} of{" "}
          {blogList?.totalItems} blogs
        </Typography>
      </Box>
    </div>
  );
};

export default BlogCardSection;
