/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  isLoggedIn: boolean;
}

interface ModalStore {
  data: any;
  modalType: string;
  isOpen: boolean;
}

interface UserState {
  activeTab: string;
  user: User;
  modalStore: ModalStore;
}

const initialState: UserState = {
  activeTab: "dashboard",
  user: {
    name: "",
    isLoggedIn: false,
  },
  modalStore: {
    data: [],
    modalType: "",
    isOpen: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setUserDetails: (
      state,
      action: PayloadAction<Partial<Omit<User, "isLoggedIn">>>
    ) => {
      const { name } = action.payload;
      state.user = {
        ...state.user,
        ...action.payload,
        isLoggedIn: !!name,
      };
    },
    setModalStore: (state, action: PayloadAction<Partial<ModalStore>>) => {
      state.modalStore = {
        ...state.modalStore,
        ...action.payload,
        isOpen:
          action.payload?.isOpen !== undefined
            ? action.payload.isOpen
            : state?.modalStore?.isOpen,
      };
    },
    closeModalStore: (state) => {
      state.modalStore = {
        data: [],
        modalType: "",
        isOpen: false,
      };
    },
  },
});

export const { setActiveTab, setUserDetails, setModalStore, closeModalStore } =
  userSlice.actions;

export default userSlice.reducer;
