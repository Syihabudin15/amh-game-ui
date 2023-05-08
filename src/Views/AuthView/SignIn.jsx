import { Form, Input, Button, Spin, notification, Checkbox } from "antd";
import { useState } from "react";
import { FacebookFilled, GoogleSquareFilled } from '@ant-design/icons';


function SignIn(){
    const [spin, setSpin] = useState(false);
    const [checked, setChecked] = useState(true);

    const handleSubmit = async(e) => {
        setSpin(true);
        console.log(e);
        console.log(checked);
        setTimeout( () => {
            setSpin(false);
            notification.success({message: 'Sign In Success'});
        }, 2000);
    };

    return(
        <section title="sign in form" className="sign-wrap">
            <div className="sign-form">
                <h3>Sign In</h3>
                <Form labelCol={{span: 4}} onFinish={handleSubmit}>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder="Email Address" />
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input.Password />
                    </Form.Item>
                    
                    <Checkbox checked={checked} onClick={() => setChecked(!checked)} >Remember me</Checkbox>

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
                <p>Sign In with</p>
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

export default SignIn;