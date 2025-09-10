import React from "react";
import { useSelector, useDispatch } from "react-redux";

import EventSchedulerHeader from "./EventSchedulerBar";
import CalendarComponent from "./CalendarComponent";
import ModalComponent from "../../Modal/ModalComponent";
import RenderModalComponent from "../../Modal/RenderModalComponent";
import { RootState } from "@/store/appStore";
import { closeModalStore } from "@/features/userSlice";

const SummaryPanelWrapper = () => {
  const dispatch = useDispatch();
  const modalStore = useSelector((state: RootState) => state.user.modalStore);

  const handleClose = () => {
    dispatch(closeModalStore());
  };

  return (
    <div>
      <EventSchedulerHeader />
      <CalendarComponent />

      {modalStore?.isOpen && (
        <ModalComponent
          open={modalStore.isOpen}
          onClose={handleClose}
          styles={{ height: 400 }}
        >
          <RenderModalComponent />
        </ModalComponent>
      )}
    </div>
  );
};

export default SummaryPanelWrapper;
