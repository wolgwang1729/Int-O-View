import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    fullName: string | null;
    email: string | null;
    photo: string | null;
    phone: string | null;
    post: string | null;
    [key : string] : any
}

const initialState : UserState = {
    fullName: null,
    email : null,
    photo : null,
    phone : null,
    post : null,
}

const keys = Object.keys(initialState)

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setDetails : (state, action : PayloadAction<Partial<UserState>>) => {
            keys.forEach((key)=>{
                state[key] = action.payload[key]??state[key]
            })
        },
        removeDetails : state => {
            keys.forEach((key)=>{
                state[key] = null
            })
        }
    }
})

export const { setDetails, removeDetails } = userSlice.actions
export default userSlice.reducer