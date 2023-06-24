import { Fragment, useState } from "react";
import { Button, Col, Image, Modal, Row} from "antd";
import { useNavigate } from "react-router-dom";

const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

function CollectionCard({data}){
    const [modalOpen, settModalOpen] = useState(false);
    const nav = useNavigate();

    const seeDetail = () => {
        settModalOpen(true);
    };
    return(
        <Fragment>
            <div className="collection-card-wrapper">
                <div className="img-collection-wrap">
                    <Image src={`${base}/img/${data.img}`} alt={data.name} width={'100%'}/>
                </div>
                <div className="title-collection">
                    <h4 style={{textAlign: 'center', fontStyle: 'italic'}}>{data.name}</h4>
                    <div className="collection-card-button">
                        <Button type="primary" onClick={() => seeDetail()}>Detail</Button>
                        <Button type="primary" onClick={() => nav(`/market/collection/${data.id}`)}>See Hero List</Button>
                    </div>
                </div>
            </div>
        
            <Modal open={modalOpen} onCancel={() => settModalOpen(false)} title='Collection Details' footer={[
                <Button onClick={() => settModalOpen(false)}>Close</Button>, 
                <Button type="primary" onClick={() => nav(`/market/collection/${data.id}`)}>See Hero List</Button>
            ]}>
                <Row>
                    <Col span={7}>Name</Col>
                    <Col span={3}>:</Col>
                    <Col span={10}>{data.name}</Col>
                </Row>
                <Row>
                    <Col span={7}>Heroes</Col>
                    <Col span={3}>:</Col>
                    <Col span={10}>{data.m_heros.length}</Col>
                </Row>
                <Row>
                    <Col span={7}>Description</Col>
                    <Col span={3}>:</Col>
                </Row>
                <Row>
                    <Col>
                        <p>{data.description}</p>
                    </Col>
                </Row>
            </Modal>
        </Fragment>
    )
};

export default CollectionCard;