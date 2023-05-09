import { Fragment, useState } from "react";
import { Menu } from "antd";

function MyHero(){
    const [curr, setCurr] = useState();
    const items = [
        {label: 'In Listing', key: 'in-listing'}, 
        {label: 'History', key: 'history'},
        {label: 'All', key: 'all'}
    ];
    const handleClick = (e) => {
        setCurr(e.key);
    };

    return(
        <Fragment>
            <div className="menu-my-hero">
                <Menu mode="horizontal" items={items} selectedKeys={curr} onClick={(e) => handleClick(e)} 
                    style={{padding: '0 10px', borderRadius: 20}} />
            </div>
        </Fragment>
    )
};

export default MyHero;