import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
    name: 'MenuSlice',
    initialState: {
        current: null,
        isLogin: false
    },
    reducers: {
        updateCurrent: (state, action) => {
            state.current = action.payload;
        },
        setLogin: (state, action) => {
            state.isLogin = true;
        }
    }
});

export const { updateCurrent, setLogin } = MenuSlice.actions;
export default MenuSlice.reducer;