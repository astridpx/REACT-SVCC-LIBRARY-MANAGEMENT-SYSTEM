import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signUpSlice";

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
