import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from '../Views/MainView/Dashboard';
import Marketplace from '../Views/MarketView/Marketplace';
import MyHero from '../Views/UserView/MyHero';
import MyWallet from '../Views/UserView/MyWallet';
import Setting from '../Views/UserView/Setting';
import MyCard from '../Views/UserView/MyCard';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { notification } from 'antd';

function UserRouter(){
    const nav = useNavigate();

    useEffect(() => {
        const token = Cookies.get('auth-token');
        if(!token){
            notification.error({message: 'Please Login'});
            nav('/');
        }
    }, [nav]);

    return(
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/marketplace' element={<Marketplace/>} />
            <Route path='/my-hero' element={<MyHero/>} />
            <Route path='/my-wallet' element={<MyWallet/>} />
            <Route path='/my-card' element={<MyCard/>} />
            <Route path='/setting' element={<Setting/>} />
        </Routes>
    )
};

export default UserRouter;