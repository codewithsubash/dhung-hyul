import React from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, Button, Grid } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { useGetSpecificUserDetailQuery } from "../../../../../store/services/userApi";
import InformationTile from "../../../../../components/Shared/InformationTile";
import BreadcrumbLayout from "../../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import InfoGridSkeleton from "../../../../../components/Shared/Skeleton/InfoGridSkeleton";

const UserDetailScreen = () => {
  let { id } = useParams();

  const {
    data: userDetail,
    isLoading: loadingUser,
    isFetching: fetchingUser,
  } = useGetSpecificUserDetailQuery(id);

  const NAME_INITIAL = userDetail?.name
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((el) => el?.charAt(0)?.toUpperCase())
    ?.join(" ");

  const breadcrumbs = [
    {
      title: "Users",
      path: "/app/crm/user/list",
    },
    {
      title: "User Detail",
    },
  ];

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      isBusy={loadingUser}
      headerActions={<PageActions id={id} />}
    >
      <BreadcrumbLayout.Paper>
        {!loadingUser || !fetchingUser ? (
          <Box padding={3}>
            <Grid container spacing={4}>
              <Grid item size={4}>
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    src={userDetail?.avatar?.url}
                    sx={{ height: 120, width: 120 }}
                  >
                    {NAME_INITIAL}
                  </Avatar>

                  <div className="text-center text-xl font-medium">
                    {userDetail?.name}
                  </div>
                </div>
              </Grid>

              <Grid item size={4}>
                <InformationTile
                  iconName="EmailOutlined"
                  title="Email"
                  subtitle={userDetail?.email}
                />
              </Grid>

              <Grid item size={4}>
                <InformationTile
                  iconName="PhoneOutlined"
                  title="Phone"
                  subtitle={userDetail?.phone}
                />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <InfoGridSkeleton />
        )}
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default UserDetailScreen;

const PageActions = ({ id }) => {
  return (
    <Box className="flex gap-6">
      <Link to={`/app/crm/user/${id}/edit`}>
        <Button startIcon={<Edit />} variant="contained">
          Edit
        </Button>
      </Link>
    </Box>
  );
};
