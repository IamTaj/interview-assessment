/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { ADD_MODAL, EDIT_MODAL, EVENT_MODAL, VIEW_MODAL } from "../constant";
import ViewModal from "./ViewModal";
import { RootState } from "@/store/appStore";
import AppealForm from "./AddUpdateModal";
import EventForm from "../Tabs/SummaryTab/EventForm";

const RenderModalComponent = () => {
  const selectModalType = useSelector(
    (state: RootState) => state?.user?.modalStore?.modalType
  );
  const selectModalData: any = useSelector(
    (state: RootState) => state?.user?.modalStore?.data
  );

  switch (selectModalType) {
    case VIEW_MODAL:
      return <ViewModal />;
    case ADD_MODAL:
      return <AppealForm mode="add" onClose={selectModalData?.callBack} />;
    case EDIT_MODAL:
      return (
        <AppealForm
          mode="edit"
          initialData={selectModalData?.formData}
          onClose={selectModalData?.callBack}
        />
      );
    case EVENT_MODAL:
      return <EventForm />;
    default:
      return null;
  }
};

export default RenderModalComponent;
