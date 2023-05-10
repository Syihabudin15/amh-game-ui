import { Row, Col } from 'antd';
import '../compStyle.css';

function Biodata({name, value}){
    return(
        <Row className='biodata'>
            <Col>
                <p>{name}</p>
            </Col>
            <Col><p>:</p></Col>
            <Col><p>{value !== null ? value : 'Not Set'}</p></Col>
        </Row>
    )
};

export default Biodata;