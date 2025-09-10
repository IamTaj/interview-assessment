/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppealState {
  data: Array<Record<string, any>>;
  selectedItems: (string | number)[];
}

interface Appeal {
  [key: string]: any;
  accountNumber: string;
}


const initialState: AppealState = {
  data: [],
  selectedItems: [],
};

export const appealSlice = createSlice({
  name: "appeal",
  initialState,
  reducers: {
    setAppealData: (state, action: PayloadAction<Appeal[]>) => {
      state.data = action.payload;
    },
    addAppeal: (state, action: PayloadAction<Appeal>) => {
      state.data.push(action.payload);
    },
    updateAppeal: (state, action: PayloadAction<Appeal>) => {
      const updated = action.payload;
      state.data = state.data.map((item) =>
        item.accountNumber === updated.accountNumber ? updated : item
      );
    },
    deleteAppeal: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.data = state.data.filter((item) => item.accountNumber !== id);
      state.selectedItems = state.selectedItems.filter((item) => item !== id);
    },
    toggleSelectItem: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      if (state.selectedItems.includes(id)) {
        state.selectedItems = state.selectedItems.filter((item) => item !== id);
      } else {
        state.selectedItems.push(id);
      }
    },
    clearSelectedItems: (state) => {
      state.selectedItems = [];
    },
  },
});

export const {
  setAppealData,
  addAppeal,
  updateAppeal,
  deleteAppeal,
  toggleSelectItem,
  clearSelectedItems,
} = appealSlice.actions;

export default appealSlice.reducer;
