import { createSlice } from "@reduxjs/toolkit";

export const DashboarSlice = createSlice({
  name: "dashboardDetails",
  initialState: {
    membersNo: 0,
    applicantsNo: 0,
    issueNo: 0,
    booksNo: 0,
  },

  reducers: {
    memberReducer: (state, action) => {
      state.membersNo = action.payload.membersNo;
    },
    applicantReducer: (state, action) => {
      state.applicantsNo = action.payload.applicantsNo;
    },
    issueReducer: (state, action) => {
      state.issueNo = action.payload.issueNo;
    },
    booksReducer: (state, action) => {
      state.booksNo = action.payload.booksNo;
    },
  },
});

export const { memberReducer, applicantReducer, issueReducer, booksReducer } =
  DashboarSlice.actions;

export default DashboarSlice.reducer;
