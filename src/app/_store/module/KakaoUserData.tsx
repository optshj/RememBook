import { createSlice } from "@reduxjs/toolkit"
import { KakaoUser } from "../../_types/KakaoUserData"

interface UserState {
    userData: KakaoUser | null
}

const initialState: UserState = { userData: null }

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state = action.payload
        }
    }
})

export const { setUserData } = userDataSlice.actions
export default userDataSlice.reducer
