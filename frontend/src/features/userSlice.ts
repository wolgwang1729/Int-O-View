import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName: null,
    email : null,
    photo : null,
    phone : null,
    post : null,
    status : null,    
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setDetails : (state, action) => {
            state.fullName = action.payload.fullName
            state.email = action.payload.email
            state.photo = action.payload.photo
            state.phone = action.payload.phone
            state.post = action.payload.post
            state.status = action.payload.status
        },
        removeDetails : state => {
            state.fullName = null
            state.email = null
            state.photo = null
            state.phone = null
            state.post = null
            state.status = null
        }
    }
})

export const { setDetails, removeDetails } = userSlice.actions
export default userSlice.reducer