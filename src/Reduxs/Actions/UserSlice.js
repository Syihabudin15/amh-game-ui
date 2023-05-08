import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk('user/getUser', async () => {

});

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState: {
        name: 'Syihabudin'
    }
});

export default UserSlice.reducer;