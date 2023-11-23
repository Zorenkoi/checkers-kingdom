import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  soundOn: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSound: (state, action) => {
      return {
        ...state,
        soundOn: action.payload,
      };
    },
  },
});

const settingsReducer = settingsSlice.reducer;
export const { setSound } = settingsSlice.actions;
export default settingsReducer;
