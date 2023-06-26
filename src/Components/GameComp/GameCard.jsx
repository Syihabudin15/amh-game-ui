import { Image, Col, Button, Modal, Spin, Row, Pagination } from "antd";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMyHero } from "../../Reduxs/Actions/MyHeroSlice";
const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

function GameCard({data}){
    const {isLoading, myHeroes, total} = useSelector(state => state.myHero);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [myHero, setMyHero] = useState();
    const [feed, setFeed] = useState('');
    const nav = useNavigate();
    const dis = useDispatch();

    const handleClick = () => {
        if(!myHero) return setFeed('Please Choose a hero');
        nav(`/game${data.url}/${myHero}`);
    };
    useEffect(() => {
        dis(getAllMyHero({type: 'all', page}))
    }, [dis, page]);
    return(
        <Fragment>
            <div>
                <div className="col-game">
                    <div style={{borderBottom: '1px solid black', height: 170}}>
                        <Image src={data.img} height={'100%'} width={'100%'}/>
                    </div>
                    <div>
                        <p style={{fontWeight: 'bold'}}>{data.name}</p>
                        <p>Description : </p>
                        <p style={{margin: 15}}>{data.desc}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" onClick={() => setOpen(true)}>Play Game</Button>
                    </div>
                </div>
            </div>
            <Modal title='Choose Hero' open={open} footer={[]} onCancel={() => setOpen(false)}>
                <Spin spinning={isLoading}>
                    {myHeroes && myHeroes.map((e,i) => (
                        <div className='choose-hero-wrap'>
                            <div key={i} onClick={() => {
                                setMyHero(prev => prev === null ? e.id : null)
                                setFeed('')
                            }} className={`choose-hero ${e.id === myHero? 'choosed' : null}`}>
                                <div className='choose-hero-img'>
                                    <Image src={`${base}/img/${e.m_hero.img}`} width={'100%'} height={'100%'} />
                                </div>
                                <Row>
                                    <Col span={10}>Level</Col> <Col offset={4} span={4}>:</Col> <Col>{e.m_hero.level}</Col>
                                    <Col span={10}>Point</Col> <Col offset={4} span={4}>:</Col> 
                                    <Col>{e.my_point !== e.m_hero.max_point ? e.my_point : 'MAX'}</Col>
                                </Row>
                                
                            </div>
                        </div>
                    ))}
                    {feed ? <p style={{color: 'red', fontStyle: 'italic', fontSize: '.8em'}}>{feed}</p> : ''}
                    <Pagination total={total} onChange={(e) => setPage(e)} defaultCurrent={page} className="pagination" />
                    <div style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" onClick={() => handleClick()}>Confirm</Button>
                    </div>
                </Spin>
            </Modal>
        </Fragment>
    )
};

export default GameCard;