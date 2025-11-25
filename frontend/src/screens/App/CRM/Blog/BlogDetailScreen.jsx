import React from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import ReactHtmlParser from "html-react-parser";

import BreadcrumbLayout from "../../../../components/Shared/BreadCrumb/BreadcrumbLayout";
import InformationTile from "../../../../components/Shared/InformationTile";
import InfoGridSkeleton from "../../../../components/Shared/Skeleton/InfoGridSkeleton";
import { useGetBlogDetailQuery } from "../../../../store/services/blogApi";

const BlogDetailScreen = () => {
  const { id } = useParams();

  const breadcrumbs = [
    { title: "Blogs", path: "/app/crm/blog/list" },
    { title: "Blog Detail" },
  ];

  //   RTK Query
  const {
    data: blogDetail,
    isLoading: loadingBlogDetail,
    error,
  } = useGetBlogDetailQuery(id);

  const PageActions = () => (
    <Link to={`/app/crm/blog/${id}/edit`}>
      <Button variant="contained" startIcon={<EditOutlined />}>
        Edit
      </Button>
    </Link>
  );

  return (
    <BreadcrumbLayout
      breadcrumbs={breadcrumbs}
      isBusy={loadingBlogDetail}
      error={error}
      headerActions={<PageActions />}
    >
      <BreadcrumbLayout.Paper>
        {!loadingBlogDetail ? (
          <Box padding={3}>
            <Grid container spacing={4}>
              <Grid item size={{ xs: 12, md: 7.5 }}>
                <img
                  src={blogDetail?.image?.secureUrl}
                  alt="Blog Cover"
                  style={{
                    height: 410,
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: ".25rem",
                    border: "1px solid lightgray",
                  }}
                />
              </Grid>

              <Grid item size={{ xs: 12, md: 4.5 }}>
                <Box display="flex" flexDirection="column" gap={3}>
                  <InformationTile title="Title" subtitle={blogDetail?.title} />

                  <InformationTile
                    title="Author"
                    subtitle={blogDetail?.author}
                  />

                  <InformationTile title="Status">
                    <div
                      className={`uppercase ${
                        blogDetail?.isActive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {blogDetail?.isActive ? "Active" : "Inactive"}
                    </div>
                  </InformationTile>

                  <InformationTile
                    title="Is Featured?"
                    subtitle={blogDetail?.isFeatured ? "Yes" : "No"}
                  />

                  <InformationTile title="Tags" subtitle={blogDetail?.tags} />
                </Box>
              </Grid>
            </Grid>

            <Box style={{ color: "gray" }}>
              {ReactHtmlParser(blogDetail?.content)}
            </Box>
          </Box>
        ) : (
          <InfoGridSkeleton />
        )}
      </BreadcrumbLayout.Paper>
    </BreadcrumbLayout>
  );
};

export default BlogDetailScreen;
