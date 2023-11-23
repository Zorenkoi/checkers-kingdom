import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  whiteScore: 0,
  blackScore: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    whiteWin: (state) => {
      return { ...state, whiteScore: state.whiteScore + 1 };
    },
    blackWin: (state) => {
      return { ...state, blackScore: state.blackScore + 1 };
    },
    resetScore: () => {
      return initialState;
    },
  },
});

const scoreReducer = scoreSlice.reducer;
export const { whiteWin, blackWin, resetScore } = scoreSlice.actions;
export default scoreReducer;
