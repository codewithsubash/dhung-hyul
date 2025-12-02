import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ReactHtmlParser from "html-react-parser";
import { Box } from "@mui/material";
import { formatDate } from "../../../../utils/dateFormatter";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, link = "#" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/blog/${blog?.slug}/detail`}>
      <div className="w-full max-w-lg cursor-pointer">
        {/* Image Container - Separate at top */}
        <div
          className="relative overflow-hidden rounded-3xl mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="h-72 overflow-hidden rounded-3xl relative">
            <img
              src={blog?.image?.secureUrl}
              alt={blog?.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          </div>

          {/* Arrow Icon */}
          <div
            className="absolute bottom-4 left-4 bg-green-600 rounded-full p-3 shadow-lg transition-all duration-300 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered
                ? "translate(0,0) scale(1)"
                : "translate(-20px,20px) scale(0.5)",
            }}
          >
            <ArrowUpRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Content - Separate below image */}
        <div>
          {/* Category and Date */}
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block px-3 py-1 border border-green-700 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {blog?.category?.name}
            </span>
            <span className="text-gray-500 text-xs font-medium">
              {formatDate(blog?.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium text-gray-900 leading-tight mb-2">
            {blog?.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
