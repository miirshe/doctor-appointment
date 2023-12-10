import { configureStore } from '@reduxjs/toolkit'
import { UserSlices } from './slices/UserSlices'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
    reducer : {
        [UserSlices.reducerPath]:UserSlices.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserSlices.middleware)
})
setupListeners(store.dispatch);