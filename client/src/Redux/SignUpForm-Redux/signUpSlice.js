import { createSlice } from "@reduxjs/toolkit";

export const signUpSlice = createSlice({
  name: "showHideSignUp",
  initialState: {
    signUpShowValue: false,
  },

  reducers: {
    update: (state, action) => {
      state.signUpShowValue = action.payload.signUpShowValue;
    },
  },
});

// export const SignUpFormSlice = createSlice({
//   name: "signUpForm",
//   initialState: {
//     signUp: false,
//   },

//   reducers: {
//     updateSignUpValue: (state, action) => {
//       state.signUp = action.payload.signUp;
//     },
//   },
// });

// export const { update } = SignUpFormSlice.actions;
// export default SignUpFormSlice.reducer;

export const { update } = signUpSlice.actions;
export default signUpSlice.reducer;
