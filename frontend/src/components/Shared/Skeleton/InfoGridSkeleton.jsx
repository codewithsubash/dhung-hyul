import React from "react";

import { Box, Grid, Skeleton } from "@mui/material";

const InfoGridSkeleton = ({ columns = 4, items = 4, descRows = 1 }) => {
  return (
    <Box padding={3}>
      <Grid container spacing={4}>
        {new Array(items).fill(null).map((_, index) => (
          <Grid key={index} item md={12 / columns}>
            <Skeleton variant="rect" height={60} />
          </Grid>
        ))}

        {new Array(descRows).fill(null)?.map((_, index) => (
          <Grid key={index} item xs={12}>
            <Skeleton variant="rect" height={100} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoGridSkeleton;
