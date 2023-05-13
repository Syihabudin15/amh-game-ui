import { Button, Modal, Row, Col } from "antd";
import { Fragment, useState } from "react";

export function MyHeroDetail({data}){
    let setFooter = () => {
        if(data.m_hero.level === 0){
            return [<Button onClick={() => setOpen(false)}>Close</Button>]
        }
        if(data.is_trade === true){
            return [<Button>Cancel Sell</Button>]
        }
        return [<Button>Sell</Button>,<Button>Send</Button>]
    };
    const [open, setOpen] = useState(false);
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
                    <Col style={{fontWeight: 'bolder', fontStyle: 'italic'}}>Anya Collection</Col>
                </Row>
            </Modal>
        </Fragment>
    )
}