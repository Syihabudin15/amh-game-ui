import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input, Select, Table } from "antd";
import { DeleteFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { CreateCard, DeleteCard, getCard } from "../../Reduxs/Actions/CardSlice";

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
    
    const onDelete = async (data) => {
        await dis(DeleteCard(data));
        dis(getCard());
    };

    const handleFinish = async (e) => {
        setLoading(true);
        if(!e.codeBank || !e.noBank){
            return setLoading(false);
        }
        await dis(CreateCard({name: e.codeBank, no_card: e.noBank}));
        dis(getCard());
        setLoading(false);
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
                <div className="adds-wrap-mycard">
                    <div className="add-1">
						<a href="https://rollercoin.com/?r=kk1kson4">
							<img src="https://static.rollercoin.com/static/img/ref/gen2/w250h250.gif" alt="250h250"/>
						</a>
                    </div>
                    <div className="add-2">
						<a href="https://rollercoin.com/?r=kk1kson4">
							<img src="https://static.rollercoin.com/static/img/ref/gen2/w460h60.gif" alt="460h60"/>
						</a>
                        <a href="https://rollercoin.com/?r=kk1kson4" className="add-2-after">
							<img src="https://static.rollercoin.com/static/img/ref/gen2/w460h60.gif" alt="460h60"/>
						</a>
                    </div>
                    <div className="add-1">
						<a href="https://rollercoin.com/?r=kk1kson4">
							<img src="https://static.rollercoin.com/static/img/ref/gen2/w250h250.gif" alt="250h250"/>
						</a>
                    </div>
                </div>
            </section>
        </Fragment>
    )
};

export default MyCard;