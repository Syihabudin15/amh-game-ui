import { Button, Col, Drawer, Row, Menu } from "antd";
import LeftMenu from "./LeftMenu";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined, LoginOutlined, LogoutOutlined, ShopTwoTone, WalletTwoTone, 
    SettingTwoTone, CustomerServiceOutlined, PlayCircleTwoTone, CreditCardTwoTone, MenuOutlined } from '@ant-design/icons';
import '../compStyle.css';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { setLogin, updateCurrent } from "../../Reduxs/Actions/MenuSlice";

function MenuWrapper(){
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.user);
    const {current, isLogin} = useSelector(state => state.menu);
    const [items, setItems] = useState([]);
    const dis = useDispatch();
    const nav = useNavigate();

    const handleClick = (e) => {
        if(e.key === '#'){
            Cookies.remove('auth-token');
            dis(setLogin(false));
            nav('/');
            window.location.reload(false);
        }else{
            nav(e.key);
            dis(updateCurrent(e.key));
        }
    }

    useEffect(() => {
        if(isLogin){
            setItems([
                {label: 'Market', key: '/market', icon: <ShopTwoTone />},
                {label: 'Marketplace', key: '/user/marketplace'},
                {label: 'My Hero', key: '/user/my-hero'},
                {label: 'My Wallet', key: '/user/my-wallet', icon: <WalletTwoTone />},
                {label: 'Game', key:'/game/choose', icon: <PlayCircleTwoTone />},
                {label: <span style={{fontWeight: 'bold', fontStyle: 'italic'}}>{user.firstName}</span>, key: '#user-menu',
                    icon: <UserOutlined style={{color: 'blue', border: '1px solid blue', padding: 5, borderRadius: 50}}/>,
                    children: [
                        {label: 'Sign out', key: '#', danger: true, icon: <LogoutOutlined style={{color: 'red'}}/>},
                        {label: 'Dashboard', key: '/user/dashboard'},
                        {label: 'Profile', key: '#profile-menu', children: [
                            {label: 'Setting', key: '/user/setting', icon: <SettingTwoTone />},
                            {label: 'My Card', key: '/user/my-card', icon: <CreditCardTwoTone />}
                        ]},
                        {label: 'Help Center', key: '/help-center', icon: <CustomerServiceOutlined />}
                    ]
                }
            ]);
        }else{
            setItems([
                {label: 'About Us', key: '/about'},
                {label: 'Blog', key: '/blog'},
                {label: 'Market', key: '/market'},
                {key: '#auth-menu', icon: <UserOutlined style={{
                        color: 'blue', border: '1px solid blue', padding: 5, borderRadius: 50
                    }}/>,  
                    children: [
                        {label: 'Sign Up', key: '/sign-up'},
                        {label: 'Sign In', key: '/sign-in', icon: <LoginOutlined style={{color: 'blue'}} />}
                    ]
                }
            ]);
        }
    }, [isLogin]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <section title="menu section">
            <Row className="menu-wrap">
                <Col>
                    <LeftMenu/>
                </Col>
                <Col span={isLogin ? 12 : 5} className="menu-window">
                    <Menu items={items} mode="horizontal" selectedKeys={current} style={{backgroundColor: '#fff'}} onClick={(e) => handleClick(e)} />
                </Col>
                <Col className="menu-mobile">
                    <Button onClick={() => setOpen(true)}>
                        <MenuOutlined/>
                    </Button>
                </Col>
            </Row>
            <Drawer title='Menu' open={open} onClose={() => setOpen(false)} width={'70vw'}>
                <Menu mode="inline" items={items} onClick={(e) => handleClick(e)} selectedKeys={current} style={{backgroundColor: '#fff'}} />
            </Drawer>
        </section>
    )
};


export default MenuWrapper;