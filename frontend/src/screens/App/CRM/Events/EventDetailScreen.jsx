import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import ReactHtmlParser from "html-react-parser";

import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import InformationTile from "../../../../components/Shared/InformationTile";
import InfoGridSkeleton from "../../../../components/Shared/Skeleton/InfoGridSkeleton";
import {
  useGetEventDetailQuery,
  useUpdateEventMutation,
} from "../../../../store/services/eventApi";
import {
  formatEventDate,
  formatDateRange,
  getEventStatus,
  getRegistrationStatus,
} from "../../../../utils/dateFormatter";
import EventPathway from "../../../../components/Shared/EventPathWay";
import { EventTabs } from "./components/eventTabs";

const sectionTitleStyle = {
  fontSize: "20px",
  fontWeight: 520,
  mb: 3,
};

const EventDetailScreen = () => {
  const { id } = useParams();

  const EVENT_STATUSES = ["Draft", "Published", "Cancelled", "Completed"];

  const [updateEvent, { isLoading: updatingEvent }] = useUpdateEventMutation();

  const handleUpdateEventStatus = async (status) => {
    try {
      await updateEvent({
        _id: eventDetail?._id,
        status,
      }).unwrap();

      toast.success("Event status updated!");
    } catch (err) {
      toast.error(err?.data?.message ?? "Couldn't update event status!");
    }
  };

  const breadcrumbs = [
    { title: "Events", path: "/app/crm/event/list" },
    { title: "Event Detail" },
  ];

  const { data: eventDetail, isLoading, error } = useGetEventDetailQuery(id);

  const PageActions = () => (
    <Link to={`/app/crm/event/${id}/edit`}>
      <Button variant="contained" startIcon={<EditOutlined />}>
        Edit
      </Button>
    </Link>
  );

  if (isLoading) {
    return (
      <BreadcrumbLayout
        breadcrumbs={breadcrumbs}
        isBusy
        headerActions={<PageActions />}
      >
        <BreadcrumbLayout.Paper>
          <InfoGridSkeleton />
        </BreadcrumbLayout.Paper>
      </BreadcrumbLayout>
    );
  }

  if (error || !eventDetail) {
    return (
      <BreadcrumbLayout
        breadcrumbs={breadcrumbs}
        headerActions={<PageActions />}
      >
        <BreadcrumbLayout.Paper>
          <Box p={3}>
            <Typography color="error">
              Failed to load event details. Please try again later.
            </Typography>
          </Box>
        </BreadcrumbLayout.Paper>
      </BreadcrumbLayout>
    );
  }

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      isBusy={isLoading}
      error={error}
      headerActions={<PageActions />}
    >
      <EventPathway
        statuses={EVENT_STATUSES}
        activeStatus={eventDetail?.status} // current status
        onChange={(status) => handleUpdateEventStatus(status)}
        isBusy={updatingEvent}
      />

      <BreadcrumbLayout.Paper>
        <Box p={{ xs: 2, sm: 3 }}>
          {/* Badge Image - Full width on mobile, centered */}
          <Grid container spacing={4}>
            <Grid size={12}>
              <InformationTile title="Badge Image">
                <Box
                  sx={{
                    height: "300px",
                    width: "100%",
                  }}
                >
                  <img
                    src={eventDetail.image.secureUrl}
                    alt={eventDetail.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: 12,
                    }}
                  />
                </Box>
              </InformationTile>
            </Grid>

            {/* Information Tiles Grid */}
            <Grid size={12}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Title"
                    subtitle={eventDetail.title}
                    iconName="SubtitlesOutlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Category"
                    subtitle={eventDetail.category?.name || "N/A"}
                    iconName="SubjectOutlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Status"
                    iconName="BorderClearOutlined"
                  >
                    <Chip
                      label={eventDetail.status}
                      size="small"
                      color={
                        eventDetail.status === "Published"
                          ? "success"
                          : eventDetail.status === "Draft"
                            ? "default"
                            : eventDetail.status === "Cancelled"
                              ? "error"
                              : "info"
                      }
                    />
                  </InformationTile>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Location"
                    subtitle={eventDetail.location || "Not specified"}
                    iconName="LocationOnOutlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Start Date"
                    subtitle={formatDateRange(eventDetail.startDate)}
                    iconName="CalendarTodayOutlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="End Date"
                    subtitle={formatDateRange(eventDetail.endDate)}
                    iconName="CalendarTodayOutlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Register Start"
                    subtitle={formatDateRange(
                      eventDetail.registrationStartDate
                    )}
                    iconName="CalendarTodayOutlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Register End"
                    subtitle={formatDateRange(eventDetail.registrationEndDate)}
                    iconName="CalendarTodayOutlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title=" Created By"
                    subtitle={eventDetail.createdBy.name || "Undefined"}
                    iconName="PersonOutlineOutlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Content Sections */}
          <Box mt={6}>
            {eventDetail.description && (
              <Box
                sx={{ color: "#374151", lineHeight: 1.7 }}
                className="rich-text-content"
              >
                {ReactHtmlParser(eventDetail.description)}
              </Box>
            )}
          </Box>
        </Box>
        <Divider />
        <EventTabs />
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default EventDetailScreen;
