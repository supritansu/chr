import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N…TA4fQ.atC_hpkHl7fY1tqJIfFRauVYjSuFsqDdRd0KXNYqvrQ"
    },
    reducers: {
        changeToken: (state, action) => {
            state.token = action.payload
        }
    }
})
export const { changeToken } = userSlice.actions;
export default userSlice.reducer;