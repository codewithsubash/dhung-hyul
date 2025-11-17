import { styled } from "@mui/material/styles";

const MainContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "drawerwidth",
})(({ theme, drawerwidth }) => ({
  position: "relative",
  backgroundColor: theme.palette.mode === "light" && theme.palette.grey[100],
  flexGrow: 1,
  padding: theme.spacing(2.5),
  paddingBottom: theme.spacing(4),

  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),

  marginLeft: `${drawerwidth}px`,
}));

export default MainContent;
