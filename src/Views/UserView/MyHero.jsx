import { Fragment, useEffect, useState } from "react";
import { Menu, Spin, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyHero } from '../../Reduxs/Actions/MyHeroSlice';

function MyHero(){
    const [curr, setCurr] = useState();
    const {isLoading, myHeroes} = useSelector(state => state.myHero);
    const dis = useDispatch();
    const items = [
        {label: 'In Listing', key: 'in-listing'}, 
        {label: 'History', key: 'history'},
        {label: 'All', key: 'all'}
    ];
    const handleClick = (e) => {
        setCurr(e.key);
    };
    useEffect(() => {
        dis(getAllMyHero());
    },[dis]);

    return(
        <Fragment>
            <div className="menu-my-hero">
                <Menu mode="horizontal" items={items} selectedKeys={curr} onClick={(e) => handleClick(e)} 
                    style={{padding: '0 10px', borderRadius: 20}} />
            </div>
            <Spin spinning={isLoading}>
                <section title="list my hero" className="list-hero-wrap">
                    {
                        myHeroes.map((e,i) => (
                            <div key={i} className="my-hero-wrap">
                                <div className="my-hero-img">
                                    <Image src={e.m_heros.img} alt={e.m_heros.img} style={{width: '100%', height: '100%'}} />
                                </div>
                                <div>
                                    <p>{e.my_point}</p>
                                    <p>{e.max_point}</p>
                                    <p>{e.m_heros.level}</p>
                                </div>
                            </div>
                        ))
                    }
                </section>
            </Spin>
        </Fragment>
    )
};

export default MyHero;