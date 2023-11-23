import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: true,
  modalBodyId: "start",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      return {
        isModalOpen: true,
        modalBodyId: action.payload,
      };
    },
    closeModal: (state) => {
      return {
        ...state,
        isModalOpen: false,
      };
    },
  },
});

const modalReducer = modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
export default modalReducer;
