import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Actions/UserSlice";
import MenuSlice from "../Actions/MenuSlice";
import WalletSlice from "../Actions/WalletSlice";
import WalletHistorySlice from "../Actions/WalletHistorySlice";
import CardSlice from "../Actions/CardSlice";

export default configureStore({
    reducer: {
        user: UserSlice,
        menu: MenuSlice,
        wallet: WalletSlice,
        historyWallet: WalletHistorySlice,
        cards: CardSlice
    }
});