import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Views/MainView/Dashboard';
import Marketplace from '../Views/MarketView/Marketplace';
import MyHero from '../Views/UserView/MyHero';
import MyWallet from '../Views/UserView/MyWallet';

function UserRouter(){
    return(
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/marketplace' element={<Marketplace/>} />
            <Route path='/my-hero' element={<MyHero/>} />
            <Route path='/my-wallet' element={<MyWallet/>} />
        </Routes>
    )
};

export default UserRouter;