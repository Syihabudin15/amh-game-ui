import { Form, Input, Button, Spin, notification, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { FacebookFilled, GoogleSquareFilled } from '@ant-design/icons';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Reduxs/Actions/MenuSlice";

function SignIn(){
    const [spin, setSpin] = useState(false);
    const [checked, setChecked] = useState(true);
    const nav = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async(e) => {
        setSpin(true);
        try{
            await axios.post('https://amh-game-api.up.railway.app/api/sign-in', {email: e.email, password: e.password})
            .then(res => {
                notification.success({message: 'Login Success'});
                Cookies.set('auth-token', res.data.data.token, {expires: 2});
                setSpin(false);
                dispatch(setLogin(true));
                nav('/user/dashboard');
            })
            .catch(err => {
                notification.error({message: err.message});
                setSpin(false);
            })
        }catch{
            notification.error({message: 'Login Failed, we have an error from server'});
            setSpin(false);
        }
    };

    useEffect(() => {
        let token = Cookies.get('auth-token');
        if(token){
            nav('/user/Dashboard');
        }
    }, [nav]);

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