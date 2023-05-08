import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Actions/UserSlice";
import MenuSlice from "../Actions/MenuSlice";

export default configureStore({
    reducer: {
        user: UserSlice,
        menu: MenuSlice
    }
});