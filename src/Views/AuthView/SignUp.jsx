import { Button, Form, Input, Spin, notification } from "antd";
import { useState } from "react";
import { FacebookFilled, GoogleSquareFilled } from '@ant-design/icons';
import '../viewStyle.css';

function SignUp(){
    const [spin, setSpin] = useState(false);
    const handleSubmit = async () => {
        setSpin(true);
        setTimeout( () => {
            setSpin(false);
            notification.success({message: 'Sign In Success'});
        }, 2000);
    };

    return(
        <section title="sign up form" className="sign-wrap">
            <div className="sign-form">
                <h3>Sign Up</h3>
                <Form labelCol={{span: 4}} onFinish={handleSubmit}>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder="Email Address" />
                    </Form.Item>

                    <Form.Item label='Phone' name='phone'>
                        <Input placeholder="Phone Number" />
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label='Confirm' name='password'>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item className="sign-button">
                        <Spin spinning={spin}>
                            <Button type="primary" htmlType="submit" style={{width: '100%', fontWeight: 'bold'}} block>
                                SUBMIT
                            </Button>
                        </Spin>
                    </Form.Item>
                </Form>
            </div>
            <div className="sign-or">
                <p>or choose Sign Up method</p>
            </div>
            <div className="sign-with">
                <div style={{cursor: 'pointer'}}>
                    <p>Google</p>
                    <GoogleSquareFilled  style={{fontSize: 30, marginLeft: 10}}/>
                </div>
                <div style={{cursor: 'pointer'}}>
                    <p>Facebook</p>
                    <FacebookFilled style={{fontSize: 30, marginLeft: 15}} />
                </div>
            </div>
        </section>
    )
};

export default SignUp;