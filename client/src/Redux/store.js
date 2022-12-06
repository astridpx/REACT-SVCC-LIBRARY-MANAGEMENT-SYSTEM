import { configureStore } from "@reduxjs/toolkit";
// import signUpReducer from "./SignUpForm-Redux/signUpSlice";
import signUpReducer from "../Redux/SignUpForm-Redux/signUpSlice";

export default configureStore({
  reducer: {
    showHideSignUp: signUpReducer,
  },
});

// export default configureStore({
//   reducer: {
//     signUpForm: userReducer,
//   },
// });
