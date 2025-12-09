import React from "react";

export const CustomTabPanel = ({ activeTab, value, children, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== activeTab}
      id={`simple-tabpanel-${activeTab}`}
      aria-labelledby={`simple-tab-${activeTab}`}
      {...other}
    >
      {activeTab === value && children}
    </div>
  );
};

export default CustomTabPanel;
