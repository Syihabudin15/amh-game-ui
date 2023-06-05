import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
// import Cookies from "js-cookie";

const base = process.env.BASE || 'http://localhost:5000';

export const getActiveEvent = createAsyncThunk('/events/active', async ({page}) => {
    let result = await axios.get(`${base}/api/events/active?page=${page}`);
    return result.data.data;
});

const EventSlice = createSlice({
    name: 'EventSlice',
    initialState: {
        isLoading: false,
        data: [],
        total: 0
    },
    extraReducers: {
        [getActiveEvent.pending]: (state) => {
            state.isLoading = true;
        },
        [getActiveEvent.rejected]: (state) => {
            state.isLoading = false;
            notification.error({message: 'error while get active Event'});
        },
        [getActiveEvent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload.rows ? action.payload.rows : [];
            state.total = action.payload.count ? action.payload.count : 0;
        }
    }
});

export default EventSlice.reducer;