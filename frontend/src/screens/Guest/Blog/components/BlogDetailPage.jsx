import React from "react";
import { useParams } from "react-router-dom";

import {
  CalendarMonthOutlined,
  Category,
  StarBorder,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  Grid,
  Typography,
  alpha,
  Paper,
  Stack,
} from "@mui/material";
import ReactHtmlParser from "html-react-parser";

import BlogDetailSkeleton from "./BlogDetailSkeleton";
import { useGetPublicBlogDetailQuery } from "../../../../store/services/publicApi";
import { DateTime } from "luxon";

const localizeDateShort = (date) =>
  DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);

const BlogBanner = ({ blogDetail }) => (
  <Box sx={{ width: "100%", mb: 3 }}>
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item size={12}>
        <Box
          sx={{
            position: "relative",
            height: { xs: 280, sm: 350, md: 400 },
          }}
        >
          {/* Image wrapper */}
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden",

              // Only bottom corners rounded
              borderBottomLeftRadius: { xs: "16px", md: "24px" },
              borderBottomRightRadius: { xs: "16px", md: "24px" },

              position: "relative",
            }}
          >
            {/* Actual Image */}
            <Box
              component="img"
              src={blogDetail?.image?.secureUrl}
              alt={blogDetail?.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",

                // Match wrapper rounding
                borderBottomLeftRadius: { xs: "16px", md: "24px" },
                borderBottomRightRadius: { xs: "16px", md: "24px" },
              }}
            />

            {/* Black Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                // Gradient darkening
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.8) 100%)",

                // Rounded bottom
                borderBottomLeftRadius: { xs: "16px", md: "24px" },
                borderBottomRightRadius: { xs: "16px", md: "24px" },

                zIndex: 1,
              }}
            />
          </Box>

          {/* Bottom content */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 2,
              pt: { xs: 8, md: 10 },
              pb: { xs: 3, md: 4 },
              px: { xs: 2, sm: 3, md: 4 },
              color: "white",
            }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1, md: 2 }}
              flexWrap="wrap"
              sx={{ gap: { xs: 1, md: 2 } }}
            >
              {blogDetail?.category && (
                <Chip
                  icon={
                    <Category
                      sx={{
                        fontSize: { xs: 16, md: 20 },
                        color: "#1976d2",
                      }}
                    />
                  }
                  label={blogDetail?.category?.name}
                  sx={{
                    backgroundColor: alpha("#fff", 0.98),
                    color: "#1976d2",
                    fontWeight: 600,
                    height: { xs: 32, md: 36 },
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    borderRadius: { xs: "16px", md: "14px" },
                    "& .MuiChip-label": { px: { xs: 1.5, md: 2 } },
                    "& .MuiChip-icon": { ml: { xs: 0.5, md: 1 } },
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#fff",
                      transform: { xs: "none", md: "translateY(-2px)" },
                      boxShadow: {
                        xs: "none",
                        md: "0 4px 12px rgba(0,0,0,0.1)",
                      },
                    },
                  }}
                />
              )}

              {blogDetail?.isFeatured && (
                <Chip
                  icon={
                    <StarBorder
                      sx={{
                        color: "#ff9800",
                        fontSize: { xs: 16, md: 20 },
                      }}
                    />
                  }
                  label="Featured "
                  sx={{
                    backgroundColor: alpha("#ff9800", 0.15),
                    color: "#fff",
                    fontWeight: 600,
                    height: { xs: 32, md: 36 },
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    borderRadius: { xs: "16px", md: "14px" },
                    "& .MuiChip-icon": { color: "#fff" },
                  }}
                />
              )}

              <Chip
                icon={
                  <CalendarMonthOutlined
                    sx={{
                      color: "#ff9800",
                      fontSize: { xs: 16, md: 20 },
                    }}
                  />
                }
                label={localizeDateShort(blogDetail?.createdAt)}
                sx={{
                  backgroundColor: alpha("#1976d2", 0.75),
                  color: "#fff",
                  fontWeight: 600,
                  height: { xs: 32, md: 36 },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  borderRadius: { xs: "16px", md: "14px" },
                  "& .MuiChip-icon": { color: "#fff" },
                }}
              />
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const BlogContent = ({ blogDetail }) => {
  return (
    <Box sx={{ width: "100%", mt: { xs: 4, md: 6 }, px: { xs: 2, md: 3 } }}>
      <Grid container spacing={4}>
        <Grid item size={12}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                About this Blog
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontWeight: 800,
                  color: "text.primary",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  position: "relative",
                }}
              >
                {blogDetail?.title}
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "4px",
                border: "1px solid",
                borderColor: "grey.200",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <Box
                sx={{ color: "#374151", lineHeight: 1.7 }}
                className="rich-text-content"
              >
                {ReactHtmlParser(blogDetail?.content)}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const {
    data: blogDetail,
    isLoading: loadingBlogs,
    isFetching: fetchingBlogs,
  } = useGetPublicBlogDetailQuery(slug);

  if (loadingBlogs || fetchingBlogs) return <BlogDetailSkeleton />;

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <BlogBanner blogDetail={blogDetail} />
      <BlogContent blogDetail={blogDetail} />
    </Box>
  );
};

export default BlogDetailPage;
