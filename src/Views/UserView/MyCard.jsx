import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input, Select, Table, notification } from "antd";
import { DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../../Reduxs/Actions/CardSlice";
import axios from "axios";
import Cookies from "js-cookie";

function MyCard(){
    const {data, isLoading} = useSelector(state => state.cards);
    const [loading, setLoading] = useState(false);
    const dis = useDispatch();

    const columns = [
        {title: 'No', dataIndex: 'no'},
        {title: 'Bank Name', dataIndex: 'bank_name'},
        {title: 'No Bank', dataIndex: 'no_bank'},
        {title: 'Act', dataIndex: 'id', render: (id) => (
            <div style={{display: "flex", gap: 5}}>
                <Button onClick={() => onDelete(id)}>
                    <DeleteFilled style={{color: 'red'}} />
                </Button>
            </div>
        )}
    ];
    const onDelete = (data) => {
        console.log(data);
        dis(getCard());
    };
    const handleFinish = async (e) => {
        setLoading(true);
        try{
            let token = Cookies.get('auth-token');
            await axios.request({
                method: 'POST',
                url: 'https://amh-game-api.up.railway.app/api/user/card',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'auth-token': `${token}`
                },
                data: {name: e.codeBank, no_card: e.noBank}
            }).then(res => {
                dis(getCard());
            }).catch(err => {
                notification.error({message: err.message});
            });
            setLoading(false);
        }catch{
            notification.error({message: 'Server Error. please try again later'});
            setLoading(false);
        }
    };

    useEffect(() => {
        dis(getCard());
    }, [dis]);

    return(
        <Fragment>
            <section title="my card">
                <div className="row-my-card">
                    <div className="col-my-card no1">
                        <h3 style={{marginBottom: 30}}>My Cards</h3>
                        <Table columns={columns} dataSource={data} style={{overflowX: 'auto'}} loading={isLoading} />
                    </div>
                
                    <div className="col-my-card">
                    <h4>Create New Card</h4>
                        <Form labelCol={{span: 8}} onFinish={handleFinish} >
                            <Form.Item label='Bank Name' name="codeBank">
                                <Select placeholder='DANA' options={[{label: 'BNI', value: 'BNI'}, {label: 'DANA', value: 'DANA'}]} disabled={loading} />
                            </Form.Item>
                            
                            <Form.Item label='No Bank' name='noBank'>
                                <Input disabled={loading} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary" loading={loading} block >SAVE</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </Fragment>
    )
};

export default MyCard;