// tell me about(i.e. Store) all the reducers in this file

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";

const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store;