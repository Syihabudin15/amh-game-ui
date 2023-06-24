import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

export const getUser = createAsyncThunk('user/getUser', async () => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'GET',
        url: `${base}/api/user`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});

export const UserUpdate = createAsyncThunk('/user/update', async(data) => {
    let token = Cookies.get('auth-token');
    let result = await axios.request({
        method: 'PUT',
        url: `${base}/api/user/update`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        },
        data: data
    });
    return result.data.data;
})

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState: {
        isLoading: false,
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        isVerified: false
    },
    reducers: {
        logout: (state) => {
            state.email = null;
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.isLoading = true;
        },
        [getUser.rejected]: (state) => {
            notification.error({message: 'Please Login'});
            state.isLoading = false;
        },
        [getUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phone = action.payload.phone;
            state.email = action.payload.m_credential.email;
            state.isVerified = action.payload.verified;
        },

        [UserUpdate.pending]: (state) => {
            state.isLoading = true;
        },
        [UserUpdate.rejected]: (state) => {
            notification.error({message: 'Please Login'});
            state.isLoading = false;
        },
        [UserUpdate.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phone = action.payload.phone;
            state.email = action.payload.m_credential.email;
            state.isVerified = action.payload.verified;
        }
    }
});
export const {logout} = UserSlice.actions;
export default UserSlice.reducer;