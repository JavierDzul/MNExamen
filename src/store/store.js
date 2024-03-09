import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        periods: periodSlice.reducer
    }
    /** Crear más slices */
})

//export type RootState = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch