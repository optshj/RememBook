import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"

import accessTokenSlice from "./module/accessToken"
import userDataSlice from "./module/KakaoUserData"

export const store = configureStore({
    reducer: {
        accessToken: accessTokenSlice,
        userData: userDataSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
