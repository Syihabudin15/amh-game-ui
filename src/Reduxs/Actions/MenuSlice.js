import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
    name: 'MenuSlice',
    initialState: {
        current: null
    },
    reducers: {
        updateCurrent: (state, action) => {
            state.current = action.payload;
        }
    }
});

export const { updateCurrent } = MenuSlice.actions;
export default MenuSlice.reducer;