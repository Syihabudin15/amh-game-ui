import { Button, Form, Input, Modal, Select, notification } from "antd";
import { Fragment, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";


export function SendBalance(){
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState();
    const [to, setTo] = useState();
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);

    const sendBalance = async () => {
        if(!amount || !to){
            return
        }
        setLoading(true);
        setDisable(true);
        try{
            let token = Cookies.get('auth-token');
            // eslint-disable-next-line
            let result = await axios.request({
                method: 'POST',
                url: `https://amh-game-api.up.railway.app/api/user/wallet/send`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                },
                data: {wallet_target: to, amount: amount}
            }); 
            notification.success({message: 'Success send, Youre Balance was changed'});
            window.location.reload();
            setLoading(false);
            setDisable(false);
            setOpen(false);
        }catch(err){
            notification.error({message: err.response.data.msg});
        }
    };

    return(
        <Fragment>
            <Button onClick={() => setOpen(true)} type="primary">Send</Button>
            <Modal title='Send Balance' open={open} onCancel={() => setOpen(false)} 
                footer={[
                    <Button onClick={() => sendBalance()} loading={loading}>Confirm</Button>,
                ]}
            >
                <Form>
                    <Form.Item name='to' label='To'>
                        <Input placeholder="No Wallet Target" value={to} onChange={(e) => setTo(e.target.value)} disabled={disable} />
                    </Form.Item>

                    <Form.Item name='amount' label='Amount'>
                        <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={disable} />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
};

export function Deposit(){
    const [pm, setPm] = useState();
    const [amount, setAmount] = useState();
    const [open, setOpen] = useState(false);

    const createDeposit = async() => {
        if(!pm || !amount) return;
        try{
            let token = Cookies.get('auth-token');
            let result = await axios.request({
                method: 'POST',
                url: `https://amh-game-api.up.railway.app/api/user/deposit/ewallet`,
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    'auth-token': `${token}`
                },
                data: {amount: amount, codeBank: pm}
            });
            console.log(result);
            alert('success');
            setOpen(false);
            window.location.replace(result.data.data.actions[0].url);
        }catch(err){
            console.log(err);
            // notification.error({message: err.response.data.msg});
        }
    };

    return(
        <Fragment>
            <Button onClick={() => setOpen(true)} type="primary" >Deposit</Button>
            <Modal open={open} onCancel={() => setOpen(false)} title="Deposit"
                footer={[
                    <Button onClick={() => createDeposit()}>Confirm</Button>
                ]}
            >
                <Form>
                    <Form.Item label='Amount' name='amount'>
                        <Input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                    </Form.Item>

                    <Form.Item label='Payment Method' name='payment-method'>
                        <Select placeholder='choose Payment Method' options={[{label: 'DANA', value: 'DANA'}]} onChange={(e) => setPm(e)} allowClear />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
};

export function Withdraw(){
    const [open, setOpen] = useState(false);
    return(
        <Fragment>
            <Button onClick={() => setOpen(true)} type="primary" disabled={true} >Withdraw</Button>
            <Modal title='Withdraw' open={open} onCancel={() => setOpen(false)}>
                <Form>
                    <Form.Item label='Amount'>
                        <Input placeholder="Amount" />
                    </Form.Item>

                    <Form.Item label="Payment Method">
                        <Select placeholder='choose Payment Method' />
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
};