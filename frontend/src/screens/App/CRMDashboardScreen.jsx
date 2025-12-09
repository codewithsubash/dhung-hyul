import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  PeopleAlt,
  Event,
  Article,
  HowToReg,
  CalendarToday,
  PersonAdd,
  EmojiEvents,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLazyGetDashboardDetailQuery } from "../../store/services/dashboardApi";
import { DashboardSkeleton } from "./CRM/DashboardSkeleton";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <Card
    sx={{
      height: "100%",
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
    }}
  >
    <CardContent>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography color="textSecondary" variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value?.toLocaleString() || 0}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar sx={{ bgcolor: color, width: 30, height: 30 }}>
          <Icon fontSize="small" />
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default function CRMDashboardScreen() {
  const [timeRange, setTimeRange] = useState("30");

  const [
    fetchDashboard,
    {
      data: dashboardData,
      isLoading: loadingDashboard,
      isFetching: fetchingDashboard,
    },
  ] = useLazyGetDashboardDetailQuery();

  useEffect(() => {
    fetchDashboard({
      timeRange,
    });
  }, [timeRange, fetchDashboard]);

  const loading = loadingDashboard || fetchingDashboard;

  const formatMonthYear = (item) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[item._id.month - 1]} ${item._id.year}`;
  };

  if (loading || !dashboardData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <DashboardSkeleton />
      </Box>
    );
  }

  // Extract data from API response
  const {
    summary = {},
    charts = {},
    topEvents = [],
    upcomingEvents = [],
    recentActivity = {},
  } = dashboardData;

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography color="textSecondary">
            Welcome back! Here's what's happening with your platform.
          </Typography>
        </Box>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
            <MenuItem value="365">Last year</MenuItem>
            <MenuItem value="all">All time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value={summary.totalUsers || 0}
            subtitle={`${summary.activeUsers || 0} active`}
            icon={PeopleAlt}
            color="#1976d2"
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Events"
            value={summary.totalEvents || 0}
            subtitle={`${summary.publishedEvents || 0} published`}
            icon={Event}
            color="#2e7d32"
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Blogs"
            value={summary.totalBlogs || 0}
            subtitle={`${summary.activeBlogs || 0} active`}
            icon={Article}
            color="#ed6c02"
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Registrations"
            value={summary.totalRegistrations || 0}
            subtitle="All time"
            icon={HowToReg}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} mb={4}>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              User Growth & Event Registrations
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={(item) => formatMonthYear(item)}
                  allowDuplicatedCategory={false}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  data={charts.userGrowth || []}
                  type="monotone"
                  dataKey="count"
                  stroke="#1976d2"
                  name="New Users"
                  strokeWidth={2}
                />
                <Line
                  data={charts.registrationTrend || []}
                  type="monotone"
                  dataKey="count"
                  stroke="#2e7d32"
                  name="Registrations"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Events by Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={charts.eventsByStatus || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry._id}: ${entry.count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(charts.eventsByStatus || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3} mb={4}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Events by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.eventsByCategory || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Users by Role
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={charts.usersByRole || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry._id}: ${entry.count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(charts.usersByRole || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Tables and Lists Row */}
      <Grid container spacing={3} mb={4}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <EmojiEvents sx={{ mr: 1, color: "#ed6c02" }} />
              <Typography variant="h6" fontWeight="bold">
                Top Events by Registration
              </Typography>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Event Name</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Registrations</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Status</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topEvents.length > 0 ? (
                    topEvents.map((event) => (
                      <TableRow key={event._id} hover>
                        <TableCell>{event.title}</TableCell>
                        <TableCell align="right">
                          {event.registrationCount}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={event.status}
                            size="small"
                            color="success"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography variant="body2" color="textSecondary">
                          No events found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <CalendarToday sx={{ mr: 1, color: "#2e7d32" }} />
              <Typography variant="h6" fontWeight="bold">
                Upcoming Events
              </Typography>
            </Box>
            <List>
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <React.Fragment key={event._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#2e7d32" }}>
                          <Event />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.title}
                        secondary={`${new Date(
                          event.startDate
                        ).toLocaleDateString()} • ${event.location}`}
                      />
                    </ListItem>
                    {index < upcomingEvents.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="textSecondary">
                        No upcoming events
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PersonAdd sx={{ mr: 1, color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="bold">
                Recent Users
              </Typography>
            </Box>
            <List>
              {recentActivity.users?.length > 0 ? (
                recentActivity.users.map((user, index) => (
                  <React.Fragment key={user._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{user.name?.charAt(0) || "U"}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={user.email}
                      />
                    </ListItem>
                    {index < recentActivity.users.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="textSecondary">
                        No recent users
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Event sx={{ mr: 1, color: "#2e7d32" }} />
              <Typography variant="h6" fontWeight="bold">
                Recent Events
              </Typography>
            </Box>
            <List>
              {recentActivity.events?.length > 0 ? (
                recentActivity.events.map((event, index) => (
                  <React.Fragment key={event._id}>
                    <ListItem>
                      <ListItemText
                        primary={event.title}
                        secondary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Chip label={event.status} size="small" />
                            <Typography variant="caption">
                              {new Date(event.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.events.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="textSecondary">
                        No recent events
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Article sx={{ mr: 1, color: "#ed6c02" }} />
              <Typography variant="h6" fontWeight="bold">
                Recent Blogs
              </Typography>
            </Box>
            <List>
              {recentActivity.blogs?.length > 0 ? (
                recentActivity.blogs.map((blog, index) => (
                  <React.Fragment key={blog._id}>
                    <ListItem>
                      <ListItemText
                        primary={blog.title}
                        secondary={`by ${blog.author} • ${new Date(
                          blog.createdAt
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                    {index < recentActivity.blogs.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="textSecondary">
                        No recent blogs
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
