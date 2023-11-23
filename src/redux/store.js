import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/mainReducer";
import scoreReducer from "./reducers/scoreReducer";
import modalReducer from "./reducers/modalReducer";
import settingsReducer from "./reducers/settingsReducer";

export const store = configureStore({
  reducer: { mainReducer, scoreReducer, modalReducer, settingsReducer },
});
