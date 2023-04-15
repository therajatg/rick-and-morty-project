import { configureStore } from "@reduxjs/toolkit";
import { characterReducer } from "./slices/characterSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { character: characterReducer },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export const useAppSelector = useSelector;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
