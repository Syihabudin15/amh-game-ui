import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

export const getUser = createAsyncThunk('user/getUser', async () => {
    let token = Cookies.get('auth-token');
    if(!token){
        notification.error({message: 'Please Login'});
    }
    let result = await axios.request({
        method: 'GET',
        url: 'https://amh-game-api.up.railway.app/api/user',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'auth-token': `${token}`
        }
    });
    return result.data.data;
});

const UserSlice = createSlice({
    name: 'UserSlice',
    initialState: {
        isLoading: false,
        errMessage: null,
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
            state.errMessage = 'Error From redux';
        },
        [getUser.fulfilled]: (state, action) => {
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