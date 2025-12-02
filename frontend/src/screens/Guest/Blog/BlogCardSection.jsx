import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import BlogCard from "./components/BlogCard";
import { useLazyGetPublicBlogListQuery } from "../../../store/services/publicApi";
import CardSkeleton from "./components/CardSkeleton";

// BlogScreen Component
const BlogCardSection = () => {
  const page = 1;
  const perPage = 10;

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

  return (
    <div className="relative min-h-screen py-16 px-5 flex flex-col items-center bg-gradient-to-b from-indigo-50 via-green-50 to-green-50 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-100px] left-[-80px] w-72 h-72 bg-indigo-300 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-[-80px] right-[-100px] w-96 h-96 bg-green-300 rounded-full filter blur-3xl opacity-20"></div>

      {/* <h1 className="text-4xl font-bold text-center mb-4">Our Blog</h1>
      <p className="text-center text-gray-600 mb-12 text-lg">
        Explore our latest articles, tutorials, and insights from the world of web development.
      </p> */}

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
    </div>
  );
};

export default BlogCardSection;
