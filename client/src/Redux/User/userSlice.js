import { createSlice } from "@reduxjs/toolkit";

export const userAccSlice = createSlice({
  name: "userAcc",
  initialState: {
    name: "TEST TEST",
  },

  reducers: {
    updatename: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

// export const { update } = SignUpFormSlice.actions;
// export default SignUpFormSlice.reducer;

export const { updatename } = userAccSlice.actions;
export default userAccSlice.reducer;
