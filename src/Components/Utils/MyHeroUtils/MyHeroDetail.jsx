import { Button, Modal, Row, Col, notification, Input } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { Fragment, useState } from "react";

const base = process.env.BASE || 'http://localhost:5000';

export function MyHeroDetail({data}){
    const [load, setLoad] = useState(false);
    const [send, setSend] = useState(false);
    const [sell, setSell] = useState(false);
    const [price, setPrice] = useState(0);
    const [receiver, setReceiver] = useState();
    let token = Cookies.get('auth-token');
    let setFooter = () => {
        if(data.m_hero.level === 0){
            return 
        }
        if(data.is_trade === true){
            return  <div className="my-hero-button"> 
                        <Button loading={load} onClick={() => cancelSell()}>Cancel Sell</Button>
                    </div>
        }
        return  <div className="my-hero-button">
                <Button onClick={() => setSell(true)} loading={load}>Sell</Button>
                <Button type="primary" loading={load} onClick={() => setSend(true)}>Send</Button>    
                </div>
    };
    const sendHero = async() => {
        if(!receiver) return;
        setLoad(true);
        try{
            let result = await axios.request({
                method: 'POST',
                url: `${base}/api/user/my-hero/send`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                },
                data: {myHeroId: data.id, receiver: receiver}
            });
            setLoad(false);
            notification.success({message: result.data.msg});
            window.location.reload();
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
                url: `${base}/api/marketplace/sell`,
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
                url: `${base}/api/marketplace/sell/cancel/${data.id}`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                }
            });
            setLoad(false);
            notification.success({message: result.data.msg});
            window.location.reload();
        }catch(err){
            notification.error({message: err.response.data.msg});
            setLoad(false);
        }
    };
    return(
        <Fragment>
            <div>
                <Row>
                    <Col span={8}>Date</Col> <Col span={3}>:</Col> <Col>{new Date(data.createdAt).toDateString()}</Col>
                </Row>
                <Row>
                    <Col span={8}>My Point</Col> <Col span={3}>:</Col> <Col>{data.my_point}<span style={{margin: '0 5px'}}>/</span>{data.m_hero.max_point}</Col>
                </Row>
                <Row>
                    <Col span={8}>Power</Col> <Col span={3}>:</Col> <Col>{data.m_hero.power}</Col>
                </Row>
                <Row>
                    <Col span={8}>Level</Col> <Col span={3}>:</Col> <Col>{data.m_hero.level}</Col>
                </Row>
                <Row>
                    {setFooter()}
                </Row>
            </div>
            <Modal title="SEND" open={send} onCancel={() => setSend(false)} footer={[<Button onClick={() => sendHero()} loading={load}>Confirm</Button>]}>
                <Row>
                    <Col span={8}>To</Col> <Col span={3}>:</Col> 
                    <Col span={12}><Input placeholder="Target Email" value={receiver} onChange={(e) => setReceiver(e.target.value)}/></Col>
                </Row>
            </Modal>

            <Modal title="SELL" open={sell} onCancel={() => setSell(false)} footer={[<Button loading={load} onClick={() => makeSell()}>Confirm</Button>]}>
                <Row>
                    <Col span={8}>Price</Col> <Col span={3}>:</Col> 
                    <Col span={12}><Input placeholder="Target Email" value={price} onChange={(e) => setPrice(parseInt(e.target.value))}/></Col>
                </Row>
            </Modal>
        </Fragment>
    )
}