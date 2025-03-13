import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    rating: 0,
    date: "",
    state: 0
}

const bookDataSlice = createSlice({
    name: "bookData",
    initialState,
    reducers: {
        setBookData: (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { setBookData } = bookDataSlice.actions
export default bookDataSlice.reducer
