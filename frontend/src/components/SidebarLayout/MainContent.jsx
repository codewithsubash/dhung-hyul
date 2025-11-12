import { styled } from "@mui/material/styles";

const MainContent = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  position: "relative",
  backgroundColor: theme.palette.mode === "light" && theme.palette.grey[100],
  flexGrow: 1,
  padding: theme.spacing(2.5),
  paddingBottom: theme.spacing(4),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerwidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default MainContent;
