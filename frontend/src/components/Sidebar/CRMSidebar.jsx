import NestedMenu from "../NestedMenu";

const CRMSidebar = () => {
  const adminMenuOptions = [
    {
      title: "Dashboard",
      path: "/app/crm/dashboard",
      icon: "DashboardCustomizeOutlined",
    },
    {
      title: "Blog",
      path: "/app/crm/blog/list",
      icon: "BookOutlined",
    },
    {
      title: "Events",
      path: "/app/crm/event/list",
      icon: "FestivalOutlined",
    },
    {
      title: "Customize List",
      path: "/app/crm/customize-list/list",
      icon: "FormatListNumberedOutlined",
    },
  ];

  return <NestedMenu menu={adminMenuOptions} initiallyOpenedMenu="Sales" />;
};

export default CRMSidebar;
