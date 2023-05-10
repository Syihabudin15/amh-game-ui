import { Fragment } from "react";
import { Button, Form, Input, Select, Table } from "antd";

function MyCard(){
    const columns = [
        {title: 'No', dataIndex: 'no'},
        {title: 'Bank Name', dataIndex: 'bank_name'},
        {title: 'No Bank', dataIndex: 'no_bank'},
        {title: 'Act', dataIndex: 'act', render: (data) => (
            <div style={{display: "flex", gap: 5}}>
                <Button>Delete</Button>
            </div>
        )}
    ];
    const data = [
        {no: 1 , bank_name: 'DANA', no_bank: '0881022157439'}
    ];
    return(
        <Fragment>
            <section title="my card">
                <div className="row-my-card">
                    <div className="col-my-card no1">
                        <h3 style={{marginBottom: 30}}>My Cards</h3>
                        <Table columns={columns} dataSource={data} style={{overflowX: 'auto'}} />
                    </div>
                
                    <div className="col-my-card">
                    <h4>Create New Card</h4>
                        <Form labelCol={{span: 8}}>
                            <Form.Item label='Bank Name'>
                                <Select placeholder='DANA' options={[{label: 'BNI', value: 'BNI'}]} />
                            </Form.Item>
                            
                            <Form.Item label='No Bank'>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary" block >SAVE</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </Fragment>
    )
};

export default MyCard;