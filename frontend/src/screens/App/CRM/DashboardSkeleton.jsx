import { Container, Grid, Paper, Skeleton } from "@mui/material";

export const DashboardSkeleton = () => (
  <Container maxWidth={false} sx={{ py: 4, px: 3 }}>
    <Grid container spacing={3} mb={4}>
      {[1, 2, 3, 4].map((i) => (
        <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={i}>
          <Paper sx={{ p: 2 }}>
            <Skeleton variant="text" width={120} height={25} />
            <Skeleton variant="rectangular" height={50} sx={{ my: 1 }} />
          </Paper>
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={3} mb={4}>
      <Grid item size={{ xs: 12, md: 8 }}>
        <Paper sx={{ p: 3, height: 300 }}>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="rectangular" height={240} />
        </Paper>
      </Grid>
      <Grid item size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 3, height: 300 }}>
          <Skeleton variant="text" width={150} />
          <Skeleton
            variant="circular"
            width={200}
            height={200}
            sx={{ mx: "auto", mt: 2 }}
          />
        </Paper>
      </Grid>
    </Grid>

    <Grid container spacing={3} mb={4}>
      <Grid item size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Skeleton variant="text" width={180} />
          <Skeleton variant="rectangular" height={240} />
        </Paper>
      </Grid>
      <Grid item size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Skeleton variant="text" width={180} />
          <Skeleton variant="rectangular" height={240} />
        </Paper>
      </Grid>
    </Grid>
  </Container>
);
