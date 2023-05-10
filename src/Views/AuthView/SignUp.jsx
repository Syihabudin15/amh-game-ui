import { Button, Form, Input, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { FacebookFilled, GoogleSquareFilled } from '@ant-design/icons';
import '../viewStyle.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp(){
    const [spin, setSpin] = useState(false);
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        let form = new FormData();
        form.append('email', e.email);
        form.append('phone', e.phone);
        form.append('password', e.password);
        
        setSpin(true);
        try{
            console.log(e)
            await axios.post('https://amh-game-api.up.railway.app/api/sign-up', form)
            .then(res => {
                notification.success({message: 'Register Success, redirect to Login'});
                setSpin(false);
                console.log(res);
                nav('/sign-in');
            }).catch(err => {
                notification.error({message: err.message});
            });
        }catch{
            notification.error({message: 'We have an error, try again later'});
            setSpin(false);
        }finally{
            setSpin(false);
        }
    };

    useEffect(() => {
        let token = Cookies.get('auth-token');
        if(token){
            nav('/user/dashboard');
        }
    }, [nav]);

    return(
        <section title="sign up form" className="sign-wrap">
            <div className="sign-form">
                <h3>Create new account</h3>
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

                    <Form.Item label='Confirm' name='conf'>
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