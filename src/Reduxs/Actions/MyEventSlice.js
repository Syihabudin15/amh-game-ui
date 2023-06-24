import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

export const getMyEvent = createAsyncThunk('/my-event/get', async() => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: `${base}/api/event`,
        headers: {
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'auth-token': `${token}`
            }
        }
    });
    return result.data.data;
});

const MyEventSlice = createSlice({
    name: 'MyEventSlice',
    initialState: {
        isLoading: false,
        data: []
    },
    extraReducers: {
        [getMyEvent.pending]: (state) => {state.isLoading = true},
        [getMyEvent.rejected]: (state) => {state.isLoading = false},
        [getMyEvent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload.rows;
        }
    }
});

export default MyEventSlice.reducer;