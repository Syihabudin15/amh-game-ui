import { Row, Col, Button } from "antd";
import { Fragment } from "react";

function ListMyEvent({data, key}){
    return(
        <Fragment>
            <div className="card-my-event" key={key}>
                <div className="my-event-top">
                    <Row>
                        <Col span={8} style={{fontWeight: 'bolder'}}>Name</Col> <Col span={3}>:</Col> 
                        <Col style={{fontWeight: 'bolder'}}>Bonus Sign Up</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{fontWeight: 'bolder'}}>Date</Col> <Col span={3}>:</Col> <Col>11 August 2022</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{fontWeight: 'bolder'}}>Progress</Col> <Col span={3}>:</Col> <Col>30%</Col>
                    </Row>
                    <Row>
                        <Col span={8} style={{fontWeight: 'bolder'}}>Reward</Col> <Col span={3}>:</Col> 
                        <Col style={{fontWeight: 'bolder'}}>Anya Collection / level 2</Col>
                    </Row>
                </div>
                <div className="my-event-button">
                    <Button>Detail</Button>
                    <Button type="primary" disabled={data.is_complete ? false : true}>Claim</Button>
                </div>
            </div>
        </Fragment>
    )
};

export default ListMyEvent;