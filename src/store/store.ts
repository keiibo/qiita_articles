import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/slice/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// RootState型を定義
export type TRootState = ReturnType<typeof store.getState>;
// AppDispatch型を定義
export type TAppDispatch = typeof store.dispatch;

// 型付きフック
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
