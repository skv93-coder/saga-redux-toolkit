import createSagaMiddleware from "redux-saga";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const slice = createSlice({
  name: "user",
  initialState: { user: [] },
  reducers: {
    getUsers: (state, action) => {
      console.log(`action`, action);
      state.user = [...state.user, ...action.payload.users];
    },
  },
});
export const { getUsers } = slice.actions;

const store = configureStore({
  reducer: { user: slice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);

export default store;
