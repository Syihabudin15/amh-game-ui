import { Fragment, useState } from "react";
import { Button, Image, Row, Col, Modal, notification } from "antd";
import Cookies from "js-cookie";
import axios from "axios";

function HeroCardMarketPlace({data}){
    const [isOpen, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    let token = Cookies.get('auth-token');
    const makePurchase = async () => {
        setLoad(true);
        try{
            let result = await axios.request({
                method: 'POST',
                url: `https://amh-game-api.up.railway.app/api/marketplace/buy/${data.id}`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                }
            });
            setLoad(false);
            notification.success({message: result.data.msg});
        }catch(err){
            notification.error({message: err.response.data.msg});
            setLoad(false);
        }
    };

    return(
        <Fragment>
            <div className="hero-card">
                <Image src={`https://amh-game-api.up.railway.app/img/${data.m_my_hero.m_hero.img}`} 
                    alt={data.m_my_hero.m_hero.img} width={140} height={130}
                />
                <div className="button-card">
                    <Button type="primary" onClick={() => setOpen(true)} block>Detail</Button>
                </div>
            </div>
            <Modal open={isOpen} title={`Level ${data.m_my_hero.m_hero.level}`} footer={[
                data.level === 0 ? '' : <Button onClick={() => makePurchase()} disabled={token ? false : true} loading={load}>Buy</Button>, 
                <Button onClick={() => setOpen(false)}>Close</Button>
            ]} onCancel={() => setOpen(false)}>
                <div style={{margin: '20px 0 20px 20px', lineHeight: 2}}>
                    <Row>
                        <Col span={8}>Level</Col> <Col span={3}>:</Col> <Col span={13}>{data.m_my_hero.m_hero.level}</Col>
                    </Row>
                    
                    <Row>
                        <Col span={8}>Price</Col> <Col span={3}>:</Col> <Col span={13}>{data.price}</Col>
                    </Row>

                    <Row>
                        <Col span={8}>Current Point</Col> <Col span={3}>:</Col> <Col span={13}>{data.m_my_hero.my_point}</Col>
                    </Row>
                    
                    <Row>
                        <Col span={8}>Max Point</Col> <Col span={3}>:</Col> <Col span={13}>{data.m_my_hero.m_hero.max_point}</Col>
                    </Row>

                    <Row>
                        <Col span={8}>Power</Col> <Col span={3}>:</Col> <Col span={13}>{data.m_my_hero.m_hero.power}</Col>
                    </Row>

                    <Row>
                        <Col span={8}>Collection</Col> <Col span={3}>:</Col> 
                        <Col span={13} style={{fontWeight: 'bolder', fontStyle: 'italic'}}>
                            {data.m_my_hero.m_hero.m_collection.name}
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Fragment>
    )
};

export default HeroCardMarketPlace;