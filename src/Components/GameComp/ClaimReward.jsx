import { Button, Modal, notification } from "antd";
import { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

function ClaimReward({id, open, restart}){
    const [load, setLoad] = useState(false);
    const nav = useNavigate();

    const handleClick = async () => {
        setLoad(true);
        let token = Cookies.get('auth-token');
        try{
            await axios.request({
                method: 'POST',
                url: `${base}/api/user/play/${id}`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                }
            });
            notification.success({message: 'Success, Balance has Changed'});
            nav('/game/choose');
        }catch(err){
            notification.error({message: err.response.data.msg});
        }
        setLoad(false);
    };
    return(
        <Fragment>
            <Modal open={open} title='Congrats Youre Winner' footer={[
                <Button onClick={() => handleClick()} loading={load}>Confirm</Button>,<Button onClick={() => restart()}>Restart</Button>
            ]}>
            </Modal>
        </Fragment>
    )
};

export default ClaimReward;