import { createSlice } from "@reduxjs/toolkit"
import { KakaoUser } from "../../types/KakaoUserData"

interface UserState {
    userData: KakaoUser | null
}

const initialState: UserState = { userData: null }

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const { setUserData } = userDataSlice.actions
export default userDataSlice.reducer
