import { createSlice } from "@reduxjs/toolkit";

export const userAccSlice = createSlice({
  name: "userAcc",
  initialState: {
    accId: null,
    name: null,
    profileImg: null,
  },

  reducers: {
    updatename: (state, action) => {
      state.name = action.payload.name;
    },
    profileImg_src: (state, action) => {
      state.profileImg = action.payload.profileImg;
    },
    accIdValue: (state, action) => {
      state.accId = action.payload.accId;
    },
  },
});

// export const { update } = SignUpFormSlice.actions;
// export default SignUpFormSlice.reducer;

export const { updatename, profileImg_src, accIdValue } = userAccSlice.actions;
export default userAccSlice.reducer;
