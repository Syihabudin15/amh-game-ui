import { Routes, Route } from "react-router-dom";
import Main from '../Views/MainView/Main';
import UserRouter from './UserRouter';
import { Fragment } from "react";
import Footer from '../Components/Utils/Footer';
import Market from '../Views/MarketView/Market';
import GameRouter from "./GameRouter";

function MainRouter(){
    return(
        <Fragment>
            <Routes>
                <Route path="/user/*" element={<UserRouter/>} />
                <Route path="/market" element={<Market/>} />
                <Route path="/game/*" element={<GameRouter/>} />
                <Route path="/" element={<Main/>} />
            </Routes>
            <Footer />
        </Fragment>
    )
};

export default MainRouter;