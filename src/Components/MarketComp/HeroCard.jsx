import { Button, Image, Modal, Row, Col, Input, notification } from "antd";
import '../compStyle.css';
import { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

function HeroCard({data}){
    const [isOpen, setOpen] = useState(false);
    const [isBuy, setIsBuy] = useState(false);
    const [qty, setQty] = useState(1);
    const [load, setLoad] = useState(false);
    let token = Cookies.get('auth-token');

    const makePurchase = async() => {
        setLoad(true);
        try{
            let result = await axios.request({
                method: 'POST',
                url: `${base}/api/market/buy`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                },
                data: {heroId: data.id, quantity: qty}
            });
            notification.success({message: result.data.msg});
            setLoad(false);
        }catch(err){
            notification.error({message: err.response.data.msg});
        }
    };
    return(
        <Fragment>
            <div className="hero-card">
                <Image src={`${base}/img/${data.img}`} alt={data.level} width={140} height={130}/>
                <div className="button-card">
                    <Button type="primary" onClick={() => setOpen(true)} block>Detail</Button>
                </div>
            </div>
            <Modal open={isOpen} title={data.level === 0 ? 'Bonus Signup' : 'Level '+data.level} footer={[
                data.level === 0 ? '' : <Button onClick={() => setIsBuy(true)} disabled={token ? false : true}>Buy</Button>, 
                <Button onClick={() => setOpen(false)}>Close</Button>
            ]} onCancel={() => setOpen(false)}>
                <div style={{margin: '20px 0 20px 20px', lineHeight: 2}}>
                    <Row>
                        <Col span={8}>Level</Col> <Col span={3}>:</Col> <Col span={13}>{data.level}</Col>
                    </Row>
                    
                    <Row>
                        <Col span={8}>Supply</Col> <Col span={3}>:</Col> <Col span={13}>{data.supply}</Col>
                    </Row>
                    
                    <Row>
                        <Col span={8}>Stock</Col> <Col span={3}>:</Col> <Col span={13}>{data.stock}</Col>
                    </Row>
                    
                    <Row>
                        <Col span={8}>Price</Col> <Col span={3}>:</Col> <Col span={13}>{data.default_price}</Col>
                    </Row>
                    
                    <Row>
                        <Col span={8}>Max Point</Col> <Col span={3}>:</Col> <Col span={13}>{data.max_point}</Col>
                    </Row>

                    <Row>
                        <Col span={8}>Power</Col> <Col span={3}>:</Col> <Col span={13}>{data.power}</Col>
                    </Row>

                    <Row>
                        <Col span={8}>Collection</Col> <Col span={3}>:</Col> <Col span={13} style={{fontWeight: 'bolder', fontStyle: 'italic'}}>{data.m_collection.name}</Col>
                    </Row>
                </div>
            </Modal>
            <Modal open={isBuy} footer={[<Button onClick={() => makePurchase()} loading={load}>Confirm</Button>]} onCancel={() => setIsBuy(false)} title='Buy'>
                <Row>
                    <Col span={7}>Amount</Col> 
                    <Col span={3}>:</Col> 
                    <Col span={10}><Input placeholder="Quantity" value={qty} onChange={(e) => setQty(e.target.value)}/></Col>
                </Row>
            </Modal>
        </Fragment>
    )
};


export default HeroCard;