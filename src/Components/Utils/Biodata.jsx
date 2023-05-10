import { Row, Col } from 'antd';
import '../compStyle.css';
import { Fragment } from 'react';

function Biodata({user}){
    let {firstName, lastName, phone, email, isVerified} = user;
    return(
        <Fragment>
            <Row>
                <Col span={6} className='bold-info'>Name</Col>
                <Col span={3}>:</Col>
                <Col className='user-info'>{firstName ? `${firstName} ${lastName}` : 'Not Set' }</Col>
            </Row>
            <Row>
                <Col span={6} className='bold-info'>Email</Col>
                <Col span={3}>:</Col>
                <Col className='user-info'>{email}</Col>
            </Row>
            <Row>
                <Col span={6} className='bold-info'>Phone</Col>
                <Col span={3}>:</Col>
                <Col className='user-info'>{phone}</Col>
            </Row>
            <Row>
                <Col span={6} className='bold-info'>Verified</Col>
                <Col span={3}>:</Col>
                <Col className='user-info'>{isVerified ? 'Verified' : 'Not Verified'}</Col>
            </Row>
            <Row>
                <Col span={6} className='bold-info'>Hero</Col>
                <Col span={3}>:</Col>
                <Col className='user-info'>0</Col>
            </Row>
        </Fragment>
    )
};

export default Biodata;