import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  UserData: [],
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      const newUser = {
        email: action.payload.email,
        status: { authenticated: true, watchList: [] },
      };
      state.UserData.push(newUser);
    },
  },
});

export const { signUp } = AuthSlice.actions;
export default AuthSlice.reducer;
