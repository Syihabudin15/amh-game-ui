import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrent } from '../../Reduxs/Actions/MenuSlice';


function LeftMenu(){
    const menu = useSelector(state => state.menu);
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleClickMenu = (e) => {
        nav('/');
        dispatch(updateCurrent(e.key));
    };

    const items = [
        {label: 'AMH GAME', key: 'amh-logo'}
    ];

    return(
        <Menu items={items} selectedKeys={menu.current} onClick={handleClickMenu} 
        style={{fontWeight: 'bold', textAlign: 'center', fontSize: '1.2em', backgroundColor: '#fff'}} className="left-menu"/>
    )
};

export default LeftMenu;