"use client"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { Provider } from "react-redux"

import accessTokenSlice from "./module/accessToken"
import userDataSlice from "./module/KakaoUserData"
import bookDataSlice from "./module/bookData"

export const store = configureStore({
    reducer: {
        accessToken: accessTokenSlice,
        userData: userDataSlice,
        bookData: bookDataSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
}
