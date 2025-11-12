import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { CodeOffOutlined } from "@mui/icons-material";

import { getMuiIcon } from "../utils/getMuiIcon";
import { useEnvConfig } from "../hooks/useEnvConfig";

const NestedMenuContext = React.createContext(null);

const useNestedMenuContext = () => React.useContext(NestedMenuContext);

const generateSlug = (text) => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
};

const NestedMenu = ({ menu = [], initiallyOpenedMenu = null }) => {
  const [openMenu, setOpenMenu] = React.useState({});

  const { DEV_MODE } = useEnvConfig();

  const location = useLocation();

  // methods
  const locationSubpath = location.pathname
    .split("/")
    .filter((el) => el.length)
    .splice(0, 3)
    .join("/");

  const validMenu = React.useMemo(() => {
    if (DEV_MODE) return menu;

    return menu?.reduce((acc, item) => {
      if (item?.inDevelopment) return acc;

      if (!item?.subMenus?.length) {
        if (!item?.inDevelopment) acc.push(item);
      } else {
        const subMenus = item?.subMenus?.filter((sm) => !sm?.inDevelopment);

        if (subMenus?.length)
          acc.push({
            ...item,
            subMenus,
          });
      }

      return acc;
    }, []);
  }, [DEV_MODE, menu]);

  React.useEffect(() => {
    if (!validMenu?.length) return;

    // expand nested menu on matched path
    const locationMenu = validMenu.find((menu) =>
      menu?.subMenus?.some((submenu) =>
        submenu?.path?.includes(locationSubpath)
      )
    );

    if (!locationMenu) return;

    if (Object.keys(openMenu)[0] === locationMenu?.title) return;

    setOpenMenu({ [locationMenu?.title]: !openMenu[locationMenu?.title] });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSubpath, menu]);

  React.useEffect(() => {
    if (!initiallyOpenedMenu) return;

    setOpenMenu({ [initiallyOpenedMenu]: true });
  }, [initiallyOpenedMenu]);

  return (
    <NestedMenuContext.Provider value={{ openMenu, setOpenMenu }}>
      <List className="no-scrollbar overflow-auto" disablePadding>
        {validMenu?.map((item, i) => (
          <React.Fragment key={i}>
            {item?.subMenus?.length ? (
              <>
                <MenuItem {...item} />

                <div id={`driver-visit-${generateSlug(item.title)}`}>
                  <Collapse
                    in={openMenu[item.title]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item?.subMenus?.map((submenu, j) => (
                        <NavLink key={i + j} to={submenu?.path}>
                          {({ isActive }) => (
                            <MenuItem
                              key={i + j}
                              {...{
                                ...submenu,
                                isActive,
                                listItemProps: { sx: { pl: 4 } },
                              }}
                            />
                          )}
                        </NavLink>
                      ))}
                    </List>
                  </Collapse>
                </div>
              </>
            ) : (
              <NavLink to={item.path}>
                {({ isActive }) => <MenuItem {...{ ...item, isActive }} />}
              </NavLink>
            )}
          </React.Fragment>
        ))}
      </List>
    </NestedMenuContext.Provider>
  );
};

export default NestedMenu;

const MenuItem = ({
  title,
  subMenus = [],
  icon,
  isActive,
  inDevelopment,
  listItemProps,
}) => {
  const { openMenu, setOpenMenu } = useNestedMenuContext();

  const textStyles = {
    color: isActive && `var(--primary)`,
  };

  // methods
  const handleMenuClick = () => {
    !!subMenus?.length > 0 && setOpenMenu({ [title]: !openMenu[title] });
  };

  return (
    <div className="relative" id={`driver-visit-${generateSlug(title)}`}>
      {isActive && <div className="absolute left-0 h-full w-1 bg-blue-500" />}

      <ListItemButton
        selected={isActive}
        onClick={handleMenuClick}
        {...listItemProps}
      >
        <ListItemIcon>
          {getMuiIcon(icon, {
            color: isActive ? "primary" : "",
            fontSize: "small",
          })}
        </ListItemIcon>

        <ListItemText sx={textStyles} color="success">
          <Box display="flex" alignItems="center" gap={1.5 / 2}>
            {title}

            {inDevelopment && (
              <Tooltip title="In Development">
                <CodeOffOutlined color="warning" fontSize="small" />
              </Tooltip>
            )}
          </Box>
        </ListItemText>

        {!!subMenus?.length && (
          <>
            {openMenu[title]
              ? getMuiIcon("KeyboardArrowUp")
              : getMuiIcon("KeyboardArrowDown")}
          </>
        )}
      </ListItemButton>
    </div>
  );
};
