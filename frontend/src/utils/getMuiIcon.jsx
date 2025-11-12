import * as MuiIcons from "@mui/icons-material";

export const getMuiIcon = (iconName, props) => {
  const Icon = MuiIcons[iconName];

  return Icon ? <Icon {...props} /> : null;
};
