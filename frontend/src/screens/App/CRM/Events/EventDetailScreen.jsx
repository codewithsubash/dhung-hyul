import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import {
  EditOutlined,
  LocationOnOutlined,
  CalendarTodayOutlined,
  AccessTimeOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import ReactHtmlParser from "html-react-parser";

import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import InformationTile from "../../../../components/Shared/InformationTile";
import InfoGridSkeleton from "../../../../components/Shared/Skeleton/InfoGridSkeleton";
import { useGetEventDetailQuery } from "../../../../store/services/eventApi";
import {
  formatEventDate,
  formatDateRange,
  getEventStatus,
  getRegistrationStatus,
} from "../../../../utils/dateFormatter";

const sectionTitleStyle = {
  fontSize: "20px",
  fontWeight: 520,
  mb: 3,
};

const EventDetailScreen = () => {
  const { id } = useParams();

  const breadcrumbs = [
    { title: "Events", path: "/app/crm/event/list" },
    { title: "Event Detail" },
  ];

  const { data: eventDetail, isLoading, error } = useGetEventDetailQuery(id);

  const eventStatus = eventDetail
    ? getEventStatus(eventDetail.startDate, eventDetail.endDate)
    : null;

  const registrationStatus = eventDetail
    ? getRegistrationStatus(
        eventDetail.registrationStartDate,
        eventDetail.registrationEndDate
      )
    : null;

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
                  <InformationTile title="Title" subtitle={eventDetail.title} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title="Category"
                    subtitle={eventDetail.category?.name || "N/A"}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile title="Status">
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

                {eventStatus && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InformationTile title="Event Status">
                      <Chip
                        label={eventStatus.label}
                        size="small"
                        sx={{
                          bgcolor: eventStatus.bgColor,
                          color: eventStatus.color,
                        }}
                      />
                    </InformationTile>
                  </Grid>
                )}

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <InformationTile
                    title={
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOnOutlined fontSize="small" />
                        Location
                      </Box>
                    }
                    subtitle={eventDetail.location || "Not specified"}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <CalendarTodayOutlined fontSize="small" sx={{ mr: 1 }} />
                      Event Date & Time
                    </Typography>
                    <Typography fontSize="0.95rem">
                      {formatDateRange(
                        eventDetail.startDate,
                        eventDetail.endDate
                      )}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <AccessTimeOutlined fontSize="small" sx={{ mr: 1 }} />
                      Registration Period
                    </Typography>

                    {registrationStatus && (
                      <Chip
                        label={registrationStatus.label}
                        size="small"
                        sx={{
                          bgcolor: registrationStatus.bgColor,
                          color: registrationStatus.color,
                          mb: 1,
                        }}
                      />
                    )}
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <CalendarTodayOutlined fontSize="small" sx={{ mr: 1 }} />
                      Registration Date and Time
                    </Typography>
                    <Typography fontSize="0.95rem">
                      {formatDateRange(
                        eventDetail.registrationStartDate,
                        eventDetail.registrationEndDate
                      )}
                    </Typography>
                  </Box>
                </Grid>

                {eventDetail.createdBy?.name && (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <InformationTile
                      title={
                        <Box display="flex" alignItems="center" gap={1}>
                          <PersonOutlineOutlined fontSize="small" />
                          Created By
                        </Box>
                      }
                      subtitle={eventDetail.createdBy.name}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* Content Sections */}
          <Box mt={6}>
            {eventDetail.overview && (
              <Box mb={5}>
                <Typography sx={sectionTitleStyle}>Event Overview</Typography>
                <Box sx={{ color: "#374151", lineHeight: 1.7 }}>
                  {ReactHtmlParser(eventDetail.overview)}
                </Box>
              </Box>
            )}

            {eventDetail.whyThisMatters && (
              <Box mb={5}>
                <Typography sx={sectionTitleStyle}>Why This Matters</Typography>
                <Box sx={{ color: "#374151", lineHeight: 1.7 }}>
                  {ReactHtmlParser(eventDetail.whyThisMatters)}
                </Box>
              </Box>
            )}

            {eventDetail.whatToExpect && (
              <Box mb={5}>
                <Typography sx={sectionTitleStyle}>What to Expect</Typography>
                <Box sx={{ color: "#374151", lineHeight: 1.7 }}>
                  {ReactHtmlParser(eventDetail.whatToExpect)}
                </Box>
              </Box>
            )}

            {eventDetail.accessibilityVenuInfo && (
              <Box
                sx={{
                  mt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Accessibility & Venue Information
                </Typography>
                <Box sx={{ color: "#374151", lineHeight: 1.7 }}>
                  {ReactHtmlParser(eventDetail.accessibilityVenuInfo)}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default EventDetailScreen;
