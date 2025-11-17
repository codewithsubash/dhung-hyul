import React from "react";
import { useSearchParams } from "react-router-dom";
import { Badge, Divider, Paper, Tab, Tabs } from "@mui/material";

function a11yProps(index) {
  return {
    id: `custom-tab-${index}`,
    "aria-controls": `custom-tab-panel-${index}`,
  };
}

export const CustomTabs = ({
  activeTab,
  tabs,
  disableDivider = false,
  children,
  isBusy = false,
  ...props
}) => {
  const [, setSearchParams] = useSearchParams();

  // methods
  const handleOnTabChange = (_, value) => setSearchParams({ tab: value });

  return (
    <Paper elevation={0} {...props} className="sticky top-[120px] z-10">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-grow">
          <Tabs
            value={activeTab}
            onChange={handleOnTabChange}
            aria-label="tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs?.map((tab, index) => (
              <Tab
                key={index}
                label={
                  tab?.badgeCount ? (
                    <>
                      {tab?.badgeComponent ? (
                        tab?.badgeComponent(tab)
                      ) : (
                        <Badge
                          badgeContent={tab?.badgeCount ?? 0}
                          color="primary"
                          className="relative"
                        >
                          <div className="mx-2 text-sm">{tab?.label}</div>

                          {tab.enablePulse && tab.badgeCount > 0 && (
                            <span className="absolute -right-2.5 -top-2.5 z-auto inline-flex h-5 w-5 animate-ping rounded-full bg-sky-600 opacity-75"></span>
                          )}
                        </Badge>
                      )}
                    </>
                  ) : (
                    tab?.label
                  )
                }
                value={tab.value}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </div>

        {!isBusy && (
          <div className="flex flex-shrink-0 items-center justify-between gap-2 px-4">
            {children}

            <div className="tab-portal" />
          </div>
        )}
      </div>

      {!disableDivider && props.variant !== "outlined" && (
        <Divider className="mt-2" />
      )}
    </Paper>
  );
};

export default CustomTabs;
