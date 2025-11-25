import React from "react";
import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import { Link } from "react-router-dom";

const LIST_TYPES = {
  BLOG_CATEGORIES: "Blog Categories",
  EVENT_CATEGORIES: "Event Categories",
};

const ListComponent = () => {
  const breadcrumbs = [
    {
      title: "Customize List",
    },
  ];

  const lists = Object.entries(LIST_TYPES).map(([key, value]) => ({
    name: key,
    label: value,
  }));

  return (
    <BreadcrumbLayout breadcrumbs={breadcrumbs}>
      <BreadcrumbLayout.Paper>
        <div className="w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Customize List Types
            </h2>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {lists.length}
            </span>
          </div>

          {/* List Items */}
          <div className="border-t border-gray-200">
            {lists.map((list, index) => (
              <Link
                key={list.name}
                to={`/app/crm/customize-list/detail?type=${list.label}`}
                className={`block p-4 hover:bg-blue-50 transition-colors ${
                  index !== lists.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">
                    {list.label}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default ListComponent;
