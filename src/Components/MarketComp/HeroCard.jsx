import { Button, Image, Modal, Row, Col } from "antd";
import '../compStyle.css';
import { Fragment, useState } from "react";

function HeroCard({data}){
    const [isOpen, setOpen] = useState(false);

    const buyClick = () => {
        console.log(data.id);
    };
    return(
        <Fragment>
            <div className="hero-card">
                <Image src={`https://amh-game-api.up.railway.app/img/${data.img}`} alt={data.level} width={140} height={130}/>
                <div className="button-card">
                    <Button type="primary" onClick={() => setOpen(true)} block>Detail</Button>
                </div>
            </div>
            <Modal open={isOpen} title={data.level === 0 ? 'Bonus Signup' : 'Level '+data.level} footer={[
                data.level === 0 ? '' : <Button onClick={() => buyClick()}>Buy</Button>, 
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
        </Fragment>
    )
};


export default HeroCard;