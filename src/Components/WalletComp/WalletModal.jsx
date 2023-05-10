import { Button, Form, Input, Modal, Select } from "antd";
import { Fragment, useState } from "react"


export function SendBalance(){
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState();
    const [to, setTo] = useState();
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);

    const sendBalance = () => {
        console.log({to, amount});
        setLoading(true);
        setDisable(true);
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

    const createDeposit = () => {
        console.log({pm, amount});
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
            <Button onClick={() => setOpen(true)} type="primary" >Withdraw</Button>
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