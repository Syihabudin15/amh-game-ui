import { Fragment, useState } from "react";
import { Button, Modal, Row, Col, Input, notification} from "antd";
import axios from "axios";
import Cookies from "js-cookie";

function VerifyUser(){
    const [loading, setLoading] = useState(false);
    const [loadingConfirm, setLoadConfirm] = useState(false);
    const [disable, setDisable] = useState(true);
    const [currTime, setTime] = useState();
    const [modal, setModal] = useState(false);
    const [otpCode, setOtpCode] = useState();
    const [feed, setFeed] = useState();
    const token = Cookies.get('auth-token');

    const sendOtp = async () => {
        let count = 60;
        setDisable(false);
        setLoading(true);

        try{
            // eslint-disable-next-line
            let sendEmail = await axios.request({
                method: 'POST',
                url: 'https://amh-game-api.up.railway.app/api/user/req-verify',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                }
            });
            notification.success({message: 'OTP has sent, check your Email'});
            let x = setInterval(() => {
                count -= 1;
                setTime(count);
                
                if(count === 0 || count <= 0) {
                    clearInterval(x);
                }
            }, 1000);
            setLoading(false);
        }catch(err){
            setLoading(false);
            notification.error({message: err.response.data.msg});
        }
    };

    const verifyOtp = async () => {
        setLoadConfirm(true);
        try{
            // eslint-disable-next-line
            let verify = await axios.request({
                method: 'POST',
                url: 'https://amh-game-api.up.railway.app/api/user/verify',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                },
                data: {otpCode: otpCode}
            });
            notification.success({message: 'Success. Youre account has verified'});
            setLoadConfirm(false);
            setModal(false);
            window.location.reload();
        }catch(err){
            setLoadConfirm(false);
            setFeed('Wrong OTP Code');
        }
    };

    return(
        <Fragment>
            <Button onClick={() => setModal(true)}><i>Verify Account</i></Button>
            <Modal open={modal} title="Verification" onCancel={() => setModal(false)} footer={[
                <Button disabled={disable} onClick={() => verifyOtp()} loading={loadingConfirm}>Confirm</Button>
            ]}>
                <Row>
                    <Col>
                        <Input placeholder="OTP Code" onChange={(e) => setOtpCode(e.target.value)} />
                        <i style={{fontSize: '.8em', color: 'red'}}>{feed ? feed : ''}</i>
                    </Col>
                    <Col style={{marginLeft: 20}}>
                        <Button loading={loading} onClick={() => sendOtp()} >{loading ?  currTime : 'Send OTP'}</Button>
                    </Col>
                </Row>
            </Modal>
        </Fragment>
    )
};

export default VerifyUser;