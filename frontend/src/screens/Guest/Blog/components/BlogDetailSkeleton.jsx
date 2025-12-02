import React from "react";
import { Box, Container, Grid, Skeleton, Paper } from "@mui/material";

const BlogDetailSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        py: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        {/* Banner Section */}
        <Grid container spacing={3}>
          <Grid item size={12}>
            <Box
              sx={{
                position: "relative",
                height: { xs: 280, sm: 350, md: 400 },
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.100",
              }}
            >
              {/* Image Skeleton */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />

              {/* Overlay Content (Title & Category Placeholder) */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  pt: 8,
                  pb: 3,
                  px: 3,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              >
                <Skeleton
                  variant="text"
                  width="60%"
                  height={36}
                  sx={{ mb: 1 }}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={32}
                  animation="wave"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Blog Content Section */}
        <Box sx={{ width: "100%", mt: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
          <Grid container spacing={4}>
            <Grid item size={12}>
              {/* Section Title */}
              <Skeleton
                variant="text"
                width="30%"
                height={28}
                sx={{ mb: 1 }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="80%"
                height={40}
                sx={{ mb: 3 }}
                animation="wave"
              />

              {/* Content Card Placeholder */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  border: "1px solid",
                  borderColor: "grey.200",
                  backgroundColor: "#fff",
                }}
              >
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ mb: 2 }}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ mb: 2 }}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ mb: 2 }}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="95%"
                  height={20}
                  sx={{ mb: 2 }}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={20}
                  animation="wave"
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetailSkeleton;
