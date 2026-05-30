import { configureStore } from '@reduxjs/toolkit'
import juegosSlice from "./features/juegosSlice.js"
import authSlice from "./features/authSlice.js"

export const store = configureStore({
    reducer: {
        juegosSlice,
        authSlice,
    },
})