import { Fragment, useEffect, useState } from "react";
import { Menu, Spin, Image, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyHero } from '../../Reduxs/Actions/MyHeroSlice';
import HistoryMyHero from "../../Components/Utils/HistoryMyHero";
import { MyHeroDetail } from "../../Components/Utils/MyHeroUtils/MyHeroDetail";

function MyHero(){
    const {isLoading, myHeroes, total} = useSelector(state => state.myHero);
    const [type, setType] = useState('all');
    const [page, setPage] = useState(1);
    const dis = useDispatch();
    const items = [
        {label: 'In Listing', key: 'listing'}, 
        {label: 'All', key: 'all'}
    ];
    const handleClick = (e) => {
        setType(e.key);
    };
    useEffect(() => {
        dis(getAllMyHero({type,page}));
    },[type,dis,page]);
    return(
        <Fragment>
            <div className="menu-my-hero">
                <Menu mode="horizontal" items={items} selectedKeys={type} defaultSelectedKeys={type} onClick={(e) => handleClick(e)} 
                    style={{padding: '0 10px', borderRadius: 20}} />
            </div>
            <Spin spinning={isLoading}>
                <section title="list my hero" className="list-hero-wrap">
                    {
                        total === 0 ? <p style={{opacity: '.4', fontWeight: 'bold', fontStyle: 'italic'}}>Not Found</p> : 
                        myHeroes.map((e,i) => (
                            <div key={i} className="my-hero-wrap">
                                <div className="my-hero-img">
                                    <Image src={`https://amh-game-api.up.railway.app/img/${e.m_hero.img}`}
                                        alt={e.m_hero.img} width={'100%'} height={'100%'} />
                                </div>
                                <div className="my-herodetail-wrap">
                                    <MyHeroDetail data={e} />
                                </div>
                            </div>
                        ))
                    }
                </section>
                <div>
                    <Pagination total={total/10} onChange={(e) => setPage(e)} className="pagination"/>
                </div>
            </Spin>
            <section title="history my hero" style={{margin: '100px 10px 0 10px'}}>
                <HistoryMyHero />
            </section>
        </Fragment>
    )
};

export default MyHero;