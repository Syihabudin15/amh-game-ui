import { Fragment, useState } from "react";
import { Button, Col, Image, Modal, Row } from "antd";

function CollectionCard(){
    const [modalOpen, settModalOpen] = useState(false);
    return(
        <Fragment>
            <div className="collection-card-wrapper">
                <div className="img-collection-wrap">
                    <Image src='https://source.unsplash.com/random/300×300/?fruit' className="img-collection"/>
                </div>
                <div className="title-collection">
                    <h4 style={{textAlign: 'center', fontStyle: 'italic'}}>Collection Name</h4>
                    <div className="collection-card-button">
                        <Button type="primary" onClick={() => settModalOpen(true)}>Detail</Button>
                        <Button type="primary">See Hero List</Button>
                    </div>
                </div>
            </div>
            <Modal open={modalOpen} onCancel={() => settModalOpen(false)} title='Collection Details' footer={[
                <Button onClick={() => settModalOpen(false)}>Close</Button>, <Button type="primary">See Hero List</Button>
            ]}>
                <Row>
                    <Col span={5}>Name</Col>
                    <Col span={3}>:</Col>
                    <Col span={10}>Collection Name</Col>
                </Row>
                <Row>
                    <Col span={5}>Description</Col>
                    <Col span={3}>:</Col>
                </Row>
                <Row>
                    <Col>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ad ullam eveniet quas sequi dolores sapiente nam reprehenderit natus earum?</p>
                    </Col>
                </Row>
            </Modal>
        </Fragment>
    )
};

export default CollectionCard;