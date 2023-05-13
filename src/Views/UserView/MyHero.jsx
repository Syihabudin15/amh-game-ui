import { Fragment, useEffect, useState } from "react";
import { Menu, Spin, Image, Button, Pagination, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyHero } from '../../Reduxs/Actions/MyHeroSlice';

function MyHero(){
    const {isLoading, myHeroes, total} = useSelector(state => state.myHero);
    const [type, setType] = useState('all');
    const [page, setPage] = useState(1);
    const dis = useDispatch();
    const items = [
        {label: 'In Listing', key: 'listing'}, 
        {label: 'History', key: 'history'},
        {label: 'All', key: 'all'}
    ];
    const columns = [
        {title: 'Date', dataIndex: 'date', render: (e) => (
            <p>{new Date(e).toDateString()}</p>
        )},
        {title: 'Type', dataIndex: 'type', render: (e) => (
            <p>{e.toUpperCase()}</p>
        )},
        {title: 'From', dataIndex: 'mUserId'},
        {title: 'To', dataIndex: 'receiver'}
    ];
    const handleClick = (e) => {
        setType(e.key);
    };
    useEffect(() => {
        dis(getAllMyHero({type,page}));
    },[type,dis, page]);
    return(
        <Fragment>
            <div className="menu-my-hero">
                <Menu mode="horizontal" items={items} selectedKeys={type} defaultSelectedKeys={type} onClick={(e) => handleClick(e)} 
                    style={{padding: '0 10px', borderRadius: 20}} />
            </div>
            <Spin spinning={isLoading}>
                {
                    type === 'history' ? 
                    <section>
                        <Table columns={columns} dataSource={myHeroes} style={{width: '90vw', overflow: 'auto', margin: '100px auto'}}/>
                    </section>
                    : 
                    <section title="list my hero" className="list-hero-wrap">
                        {
                            total === 0 ? <p style={{opacity: '.4', fontWeight: 'bold', fontStyle: 'italic'}}>Not Found</p> : 
                            myHeroes.map((e,i) => (
                                <div key={i} className="my-hero-wrap">
                                    <div className="my-hero-img">
                                        <Image src={`https://amh-game-api.up.railway.app/img/${e.m_hero.img}`}
                                            alt={e.m_hero.img} style={{width: '100%', height: '100%'}} />
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                                        <Button type="primary" block>Detail</Button>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                }
                <div>
                    <Pagination total={total/10} onChange={(e) => setPage(e)} className="pagination"/>
                </div>
            </Spin>
        </Fragment>
    )
};

export default MyHero;