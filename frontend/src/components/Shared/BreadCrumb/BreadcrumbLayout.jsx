import React from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { UnfoldMoreOutlined, UnfoldLessOutlined } from "@mui/icons-material";

// import ErrorAlert from "components/Shared/ErrorAlert";

import PageBreadcrumbs from "./PageBreadcrumbs";
import { useSidebarSettings } from "../../../hooks/useSidebarSettings";

export const BreadcrumbLayout = ({
  children,
  isBusy = false,
  breadcrumbs = [],
  toggleKey = null,
  headerActions = null,
}) => {
  const { sidebarShown, toggleSidebarSettings } = useSidebarSettings(toggleKey);

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumbs & Actions  */}
      <div className="sticky top-[62px] z-20 mt-[10px]">
        <Paper
          variant="outlined"
          className="flex items-center justify-between py-3 pr-4 pl-2"
        >
          <div className="flex items-center gap-2">
            <PageBreadcrumbs breadcrumbs={breadcrumbs} />

            {!!toggleKey && (
              <Tooltip
                arrow
                size=""
                placement="top"
                title={sidebarShown ? "Sidebar Shown" : "Sidebar Hidden"}
              >
                <IconButton size="small" onClick={toggleSidebarSettings}>
                  {sidebarShown ? (
                    <UnfoldLessOutlined
                      color="primary"
                      className="rotate-90 transform"
                    />
                  ) : (
                    <UnfoldMoreOutlined
                      color="primary"
                      className="rotate-90 transform"
                    />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </div>

          {isBusy ? (
            <CircularProgress size={26} thickness={5} />
          ) : (
            headerActions
          )}
        </Paper>
      </div>

      {children}
    </div>
  );
};

export default BreadcrumbLayout;

BreadcrumbLayout.Paper = ({ children, ...props }) => {
  return (
    <Paper variant="outlined" className="relative" {...props}>
      {children}
    </Paper>
  );
};

// BreadcrumbLayout.Error = ({ error }) => {
//   return (
//     <div className={!error && "-mt-4"}>
//       <ErrorAlert error={error} />
//     </div>
//   );
// };

BreadcrumbLayout.Redirect = ({ message, link }) => {
  if (!message) return null;

  return (
    <Alert
      severity="info"
      action={
        !!link && (
          <Link to={link}>
            <Button size="small">Click Here</Button>
          </Link>
        )
      }
    >
      {message}
    </Alert>
  );
};
