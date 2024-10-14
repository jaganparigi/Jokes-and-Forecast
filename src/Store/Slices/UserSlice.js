import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    firstName: null,
    lastName: null,
  },
  extraReducers: (builders) => {
    builders.addCase("add_field", (state, action) => {
      return {
        ...state,
        [action.name]: action.value,
      };
    });
  },
});
export default user.reducer;

// import { createSlice } from "/node_modules/.vite/deps/@reduxjs_toolkit.js?v=a27594a6";

// const user = createSlice({
//   name: "user",
//   initialState: {
//     firstName: null,
//     lastName: null,
//   },
//   extraReducers: (builders) => {
//     builders.addCase("add_field", (state, action) => {
//       return {
//         ...state,
//         [action.name]: action.value,
//       };
//     });
//   },
// });

// export default user.reducer;
