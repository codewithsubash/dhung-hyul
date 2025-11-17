import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, IconButton } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";

const PageBreadcrumbs = ({ breadcrumbs }) => {
  const navigate = useNavigate();

  const links = [
    {
      title: "Dashboard",
      path: "/app",
    },
    ...breadcrumbs,
  ];

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton size="small" onClick={() => navigate(-1)}>
        <ChevronLeftOutlinedIcon />
      </IconButton>

      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link, index) => {
          return (
            <div key={`${link.title}-${index}`}>
              {link.path ? (
                <Link
                  to={link.path}
                  style={{ color: "inherit", textDecoration: "none" }}
                  className="tracking-wider line-clamp-1"
                >
                  {link.title}
                </Link>
              ) : (
                <div
                  color="textPrimary"
                  className="tracking-wider line-clamp-1 dark:text-gray-200"
                >
                  {link.title}
                </div>
              )}
            </div>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default PageBreadcrumbs;
