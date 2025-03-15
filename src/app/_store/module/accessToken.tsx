import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const accessTokenSlice = createSlice({
    name: "accessToken",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state = action.payload
        }
    }
})

export const { setAccessToken } = accessTokenSlice.actions
export default accessTokenSlice.reducer
