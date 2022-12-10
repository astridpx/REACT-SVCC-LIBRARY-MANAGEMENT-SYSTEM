import { configureStore } from "@reduxjs/toolkit";
// import signUpReducer from "./SignUpForm-Redux/signUpSlice";
import signUpReducer from "../Redux/SignUpForm-Redux/signUpSlice";
import userReducer from "../Redux/User/userSlice";
import dashboardReducer from "../Redux/Dashboard-details/DashboardSlice";

export default configureStore({
  reducer: {
    showHideSignUp: signUpReducer,

    // USER ACC DETAILS
    userAcc: userReducer,

    // DASHBOARD CARD DETAILS
    dashboardDetails: dashboardReducer,
  },
});
