import { Routes, Route, Navigate } from "react-router-dom";
import Main from '../Views/MainView/Main';
import UserRouter from './UserRouter';
import { Fragment } from "react";
import Footer from '../Components/Utils/Footer';
import Market from '../Views/MarketView/Market';
import GameRouter from "./GameRouter";
import MarketHero from '../Views/MarketView/MarketHero';

function MainRouter(){
    return(
        <Fragment>
            <Routes>
                <Route path="/user/*" element={<UserRouter/>} />
                <Route path="/market" element={<Market/>} />
                <Route path="/market/collection/:id" element={<MarketHero/>} />
                <Route path="/game/*" element={<GameRouter/>} />
                <Route path="/" element={<Main/>} />
                <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
            <Footer />
        </Fragment>
    )
};

export default MainRouter;