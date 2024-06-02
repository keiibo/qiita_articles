// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "../../../store/store";

export type TLoginUser = {
  userId: string;
  username: string;
};

type AuthState = {
  user: TLoginUser | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TLoginUser>) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
  },
});

export const selectUser = (state: TRootState) => state.auth.user;

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
