import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Actions/UserSlice";
import MenuSlice from "../Actions/MenuSlice";
import WalletSlice from "../Actions/WalletSlice";
import WalletHistorySlice from "../Actions/WalletHistorySlice";
import CardSlice from "../Actions/CardSlice";
import CollectionSlice from "../Actions/CollectionSlice";
import HeroesSlice from "../Actions/HeroesSlice";
import MyHeroSlice from "../Actions/MyHeroSlice";
import HistoryMyHeroSlice from "../Actions/HistoryMyHeroSlice";
import EventSlice from "../Actions/EventSlice";
import MyEventSlice from "../Actions/MyEventSlice";

export default configureStore({
    reducer: {
        user: UserSlice,
        menu: MenuSlice,
        wallet: WalletSlice,
        historyWallet: WalletHistorySlice,
        cards: CardSlice,
        collections: CollectionSlice,
        heroes: HeroesSlice,
        myHero: MyHeroSlice,
        historyMyHero: HistoryMyHeroSlice,
        events: EventSlice,
        myEvent: MyEventSlice
    }
});