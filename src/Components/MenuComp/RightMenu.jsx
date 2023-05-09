import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, LoginOutlined, LogoutOutlined, ShopTwoTone, WalletTwoTone, 
    SettingTwoTone, CustomerServiceOutlined, PlayCircleTwoTone, CreditCardTwoTone } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { updateCurrent } from '../../Reduxs/Actions/MenuSlice';
import Cookies from "js-cookie";

function RightMenu({mode}){
    const user = useSelector(state => state.user);
    const menu = useSelector(state => state.menu);
    const [items, setItems] = useState([]);
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleClickMenu = (e) => {
        nav(e.key);
        dispatch(updateCurrent(e.key));
    };

    const handleLogout = () => {
        Cookies.remove('auth-token');
        nav('/');
    };

    const setItemCondition = () => {
        if(user.name === null){
            setItems([
                {label: 'About Us', key: '/about'},
                {label: 'Blog', key: '/blog'},
                {key: '#auth-menu', icon: <UserOutlined style={{
                        color: 'blue', border: '1px solid blue', padding: 5, borderRadius: 50
                    }}/>,  
                    children: [
                        {label: 'Sign Up', key: '/sign-up'},
                        {label: 'Sign In', key: '/sign-in', icon: <LoginOutlined style={{color: 'blue'}} />}
                    ]
                }
            ]);
        }else{
            setItems([
                {label: 'Market', key: '/market', icon: <ShopTwoTone />},
                {label: 'Marketplace', key: '/user/marketplace'},
                {label: 'My Hero', key: '/user/my-hero'},
                {label: 'My Wallet', key: '/user/my-wallet', icon: <WalletTwoTone />},
                {label: 'Game', key:'/game/choose', icon: <PlayCircleTwoTone />},
                {label: <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{user.name}</span>, key: '#user-menu',
                    icon: <UserOutlined style={{color: 'blue', border: '1px solid blue', padding: 5, borderRadius: 50}}/>,
                    children: [
                        {label: 'Sign out', key: '#sign-out', danger: true, icon: <LogoutOutlined style={{color: 'red'}}/>, onClick: () => handleLogout()},
                        {label: 'Dashboard', key: '/user/dashboard'},
                        {label: 'Profile', key: '#profile-menu', children: [
                            {label: 'Setting', key: '/user/setting', icon: <SettingTwoTone />},
                            {label: 'My Card', key: '#my-card', icon: <CreditCardTwoTone />}
                        ]},
                        {label: 'Help Center', key: '/help-center', icon: <CustomerServiceOutlined />}
                    ]
                }
            ]);
        }
    };

    useEffect(() => {
        setItemCondition();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <Menu mode={mode} onClick={handleClickMenu} selectedKeys={menu.current} items={items} style={{backgroundColor: '#fff'}} />
    )
};

export default RightMenu;