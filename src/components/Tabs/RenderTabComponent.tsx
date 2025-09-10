import { RootState } from "@/store/appStore";
import { useSelector } from "react-redux";
import { APPEAL_LETTER, SUMMARY } from "../constant";
import { Stack } from "@mui/material";
import { fromKebabCase } from "@/utils/stringFormatter";
const AppealPanel = dynamic(() => import("./AppealTab/AppealPanel"));
const SummaryPanelWrapper = dynamic(
  () => import("./SummaryTab/SummaryPanelWrapper")
);
import dynamic from "next/dynamic";

const RenderTabComponent = () => {
  const activeTab = useSelector((state: RootState) => state.user.activeTab);

  switch (activeTab) {
    case APPEAL_LETTER:
      return <AppealPanel />;
    case SUMMARY:
      return <SummaryPanelWrapper />;
    default:
      return <Stack>{`${fromKebabCase(activeTab)} Panel`}</Stack>;
  }
};

export default RenderTabComponent;
