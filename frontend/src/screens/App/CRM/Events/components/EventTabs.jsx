import { useSearchParams } from "react-router-dom";
import CustomTabs from "../../../../../components/Shared/CustomTabs";
import EventRegistrationTab from "./eventRegistrationTab";
import CustomTabPanel from "../../../../../components/Shared/CustomTabPanel";

export const EventTabs = () => {
  const [searchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "eventRegistration";

  const tabs = [
    {
      label: "Event Registration",
      value: "eventRegistration",
    },
  ];

  return (
    <>
      <CustomTabs tabs={tabs} activeTab={activeTab} />

      <CustomTabPanel activeTab={activeTab} value="eventRegistration">
        <EventRegistrationTab />
      </CustomTabPanel>
    </>
  );
};
