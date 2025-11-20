import React from "react";
import { createTheme } from "@mui/material";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const SidebarLayoutContext = React.createContext(null);

export const useSidebarLayoutContext = () =>
  React.useContext(SidebarLayoutContext);

const drawerWidth = 250;
const drawerWidthCollapsed = 75;

const SidebarLayoutContextProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const [preferredMode, setPreferredMode] = useLocalStorage(
    "PREFERRED_MODE",
    "light"
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // const validEntity = useSelector(selectIsValidEntity);

  // methods
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    setPreferredMode(darkMode ? "light" : "dark");
  };

  // React.useEffect(() => {
  //   if (validEntity) setShowSidebar(true);
  // }, [setShowSidebar, validEntity]);

  React.useEffect(() => {
    //tailwind darkMode configuration
    if (
      preferredMode === "dark" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setDarkMode(preferredMode === "dark");

    return () => {
      setDarkMode(false);
    };
  }, [preferredMode]);

  return (
    <SidebarLayoutContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        drawerWidth,
        drawerWidthCollapsed,
        theme,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </SidebarLayoutContext.Provider>
  );
};

export default SidebarLayoutContextProvider;
