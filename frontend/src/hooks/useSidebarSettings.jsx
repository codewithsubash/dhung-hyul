import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useSidebarLayoutContext } from "../components/SidebarLayout/context/SidebarLayoutContext";

export const useSidebarSettings = (key) => {
  const [sidebarSettings, setSidebarSettings] = useLocalStorage(
    "FSW_SIDE_BAR_SETTINGS",
    {}
  );

  const { setShowSidebar } = useSidebarLayoutContext();

  const sidebarShown = sidebarSettings[key] ?? false;

  const toggleSidebarSettings = () => {
    setSidebarSettings({ ...sidebarSettings, [key]: !sidebarShown });
  };

  React.useEffect(() => {
    if (!key) return () => setShowSidebar(true);

    setShowSidebar(sidebarSettings[key]);

    return () => setShowSidebar(true);
  }, [sidebarSettings, setShowSidebar, key]);

  return { sidebarShown, toggleSidebarSettings };
};
