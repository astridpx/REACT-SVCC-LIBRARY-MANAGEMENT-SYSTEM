import { createSlice } from "@reduxjs/toolkit";

export const userAccSlice = createSlice({
  name: "userAcc",
  initialState: {
    accId: null,
    name: null,
    accNo: null,
    email: null,
    profileImg: null,
    course: null,
    section: null,
    role: null,
  },

  reducers: {
    updatename: (state, action) => {
      state.name = action.payload.name;
    },
    accountNo: (state, action) => {
      state.accNo = action.payload.accNo;
    },
    updateEmail: (state, action) => {
      state.email = action.payload.email;
    },
    profileImg_src: (state, action) => {
      state.profileImg = action.payload.profileImg;
    },
    accIdValue: (state, action) => {
      state.accId = action.payload.accId;
    },
    sectionValue: (state, action) => {
      state.section = action.payload.section;
    },
    courseValue: (state, action) => {
      state.course = action.payload.course;
    },
    userRole: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

// export const { update } = SignUpFormSlice.actions;
// export default SignUpFormSlice.reducer;

export const {
  updatename,
  accountNo,
  profileImg_src,
  accIdValue,
  updateEmail,
  sectionValue,
  courseValue,
  userRole,
} = userAccSlice.actions;
export default userAccSlice.reducer;
