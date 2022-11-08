import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  login: string;
  password: string;
}

const initialState: userState = {
  login: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    create: (
      state,
      action: PayloadAction<{ login: string; password: string }>
    ) => {
      const { login, password } = action.payload;
      state.login = login;
      state.password = password;
    },
  },
});

export const { create } = userSlice.actions;

export default userSlice.reducer;
