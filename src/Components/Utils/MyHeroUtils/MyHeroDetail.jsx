import { Button, Modal, Row, Col, notification, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Fragment, useState } from "react";

export function MyHeroDetail({data}){
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const [sell, setSell] = useState(false);
    const [price, setPrice] = useState(0);
    const [send, setSend] = useState(false);
    const [receiver, setReceiver] = useState();
    let token = Cookies.get('auth-token');
    let setFooter = () => {
        if(data.m_hero.level === 0){
            return [<Button onClick={() => setOpen(false)}>Close</Button>]
        }
        if(data.is_trade === true){
            return [<Button loading={load} onClick={() => cancelSell()}>Cancel Sell</Button>]
        }
        return [<Button onClick={() => setSell(true)} loading={load}>Sell</Button>,<Button loading={load} onClick={() => setSend(true)}>Send</Button>]
    };
    const sendHero = async() => {
        if(!receiver) return;
        setLoad(true);
        try{
            let result = await axios.request({
                method: 'POST',
                url: 'https://amh-game-api.up.railway.app/api/user/my-hero/send',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                },
                data: {myHeroId: data.id, receiver: receiver}
            });
            setLoad(false);
            notification.success({message: result.data.msg});
        }catch(err){
            notification.error({message: err.response.data.msg});
            setLoad(false);
        }
    };
    const makeSell = async () => {
        setLoad(true);
        try{
            let result = await axios.request({
                method: 'POST',
                url: 'https://amh-game-api.up.railway.app/api/marketplace/sell',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                },
                data: {my_hero_id: data.id, price: parseInt(price)}
            });
            setLoad(false);
            notification.success({message: result.data.msg});
            window.location.reload();
        }catch(err){
            notification.error({message: err.response.data.msg});
            setLoad(false);
        }
    }
    const cancelSell = async() => {
        setLoad(true);
        try{
            let result = await axios.request({
                method: 'POST',
                url: `https://amh-game-api.up.railway.app/api/marketplace/sell/cancel/${data.id}`,
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
            <Button type="primary" onClick={() => setOpen(true)} block>Detail</Button>
            <Modal open={open} footer={setFooter()} onCancel={() => setOpen(false)}>
                <Row>
                    <Col span={8}>Date</Col> <Col span={3}>:</Col> <Col>{new Date(data.createdAt).toDateString()}</Col>
                </Row>
                <Row>
                    <Col span={8}>My Point</Col> <Col span={3}>:</Col> <Col>{data.my_point} <span>/</span> <span>{data.m_hero.max_point}</span></Col>
                </Row>
                <Row>
                    <Col span={8}>Level</Col> <Col span={3}>:</Col> <Col>{data.m_hero.level}</Col>
                </Row>
                <Row>
                    <Col span={8}>Hero Power</Col> <Col span={3}>:</Col> <Col>{data.m_hero.power}</Col>
                </Row>
                <Row>
                    <Col span={8}>Collection</Col> 
                    <Col span={3}>:</Col> 
                    <Col style={{fontWeight: 'bolder', fontStyle: 'italic'}}>{data.m_hero.m_collection.name}</Col>
                </Row>
            </Modal>
            <Modal title='Sell Hero' onCancel={() => setSell(false)} open={sell} 
                footer={[<Button type="primary" onClick={() => makeSell()} loading={load}>Confirm Sell</Button>]}
            >
                <Row>
                    <Col span={7}>Price</Col> <Col span={3}>:</Col> 
                    <Col span={10}><Input onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Price"/></Col>
                </Row>
            </Modal>
            <Modal title='Send Hero' open={send} onCancel={() => setSend(false)} footer={[
                <Button loading={load} onClick={() => sendHero()} type="primary">Confirm</Button>
            ]}>
                <Row>
                    <Col span={7}>Receiver</Col> <Col span={3}>:</Col> 
                    <Col span={10}><Input onChange={(e) => setReceiver(e.target.value)} value={receiver} placeholder="Email Receiver"/></Col>
                </Row>
            </Modal>
        </Fragment>
    )
}