import { Fragment, useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

function Setting(){
    const [disable, setDisable] = useState(true);
    const [show, setShow] = useState(false);

    const handleEdit = () => {
        setDisable(false);
        setShow(true);
    };
    const handleCancel = () => {
        setDisable(true);
        setShow(false);
    };

    return(
        <Fragment>
            <section title="setting" className="setting">
                <h2 style={{textAlign: 'center', marginBottom: 50}}>Setting</h2>
                <div>
                    <Form labelCol={{span: 5}}>
                        <Form.Item label='First Name'>
                            <Input value='Syihabudin' disabled={disable} />
                        </Form.Item>

                        <Form.Item label='Last Name'>
                            <Input value='Tsani' disabled={disable} />
                        </Form.Item>

                        <Form.Item label='Phone Number'>
                            <Input value='0881022157439' disabled={true} />
                        </Form.Item>
                        
                        <Form.Item label='Email'>
                            <Input value='Syihabudintsani15@gmail.com' disabled={true} />
                        </Form.Item>

                    </Form>
                </div>
                <div style={{textAlign: 'right'}}>
                    <Link>
                        <i>Edit Password</i>
                    </Link>
                </div>
                <div className="setting-button">
                    <Button className={show ? 'not-show' : null} onClick={() => handleEdit()}>Edit</Button>
                    <Button className={show ? null : 'not-show'} onClick={() => handleCancel()}>Cancel</Button>
                    <Button className={show ? null : 'not-show'}>Confirm</Button>
                </div>
            </section>
        </Fragment>
    )
};

export default Setting;