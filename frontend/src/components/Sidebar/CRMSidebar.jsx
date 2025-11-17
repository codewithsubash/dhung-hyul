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
      icon: "DashboardCustomizeOutlined",
    },
  ];

  return <NestedMenu menu={adminMenuOptions} initiallyOpenedMenu="Sales" />;
};

export default CRMSidebar;
