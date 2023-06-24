import { Button, Divider, Form, Input, Spin, notification } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const base = process.env.REACT_APP_BASE || 'http://localhost:5000';

function Main(){
    const [data, setData] = useState({});
    const [load, setLoad] = useState(false);
    const links = [
        {name: 'Medium', url: 'https://medium.com/syihabudintsani15'},
        {name: 'Twitter', url: 'https://facebook.com/sfikri2001'},
        {name: 'Facebook', url: 'https://medium.com/@TsaniSyihabudin'},
        {name: 'Github', url: 'https://github.com/syihabudin15'},
    ];
    const nav = useNavigate();
    
    useEffect(() => {
        const getStatus = async () => {
            setLoad(true);
            try{
                let result = await axios.get(`${base}/api/admin/status-player`);
                setData(result.data.data);
            }catch(err){
                notification.error({message: err.response.data.msg});
            }
            setLoad(false);
        };
        getStatus();
    }, []);
    
    return(
        <Spin spinning={load}>
            <section title="main website">
                <div className="main-top">
                    <div className="main-top-desc">
                        <h3 style={{fontSize: '3em', textAlign: 'center', textShadow: '2px 3px #aaa'}}>AMH GAME</h3>
                        <div>
                            <p style={{fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.1em'}}>Fun And Earn with AMH GAME</p>
                        </div>
                        <div>
                            <p>AMH GAME is a Play to Earn Platform in Indonesia Nation</p>
                            <p>You can make money by Playing the game in the Platform</p>
                            <p>We have 10+ Games for User Playing</p>
                        </div>
                        <div style={{marginTop: 30}}>
                            <p style={{fontWeight: 'bold', fontSize: '1.1em', color: 'green', textAlign: 'center'}}>Sign up now for Get Free Hero </p>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', margin: '20px auto', gap: 10}}>
                        <ArrowRightOutlined />
                            <Button style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold'}} onClick={() => nav('/sign-up')}>Start Playing</Button>
                        </div>
                    </div>
                    <div className="main-top-img">
                    </div>
                </div>
                <div className="main-feature">
                    <div className="feature-img-game">
                        <p>Image of the game</p>
                    </div>
                    <div className="feature-carousel">
                        Feature with Carousel
                    </div>
                </div>
                <div className="count-status">
                    <div>
                        <p>{data.user ? data.user : '0'} Users Registration</p>
                    </div>
                    <div>
                        <p>{data.walletTrans ? data.walletTrans : '0'} Payment</p>
                    </div>
                    <div>
                        <p>{data.collection ? data.collection : '0'} Collections</p>
                    </div>
                    <div>
                        <p>{data.hero ? data.hero : '0'} Heroes</p>
                    </div>
                    <div>
                        <p>{data.heroTrans ? data.heroTrans : '0'} Hero Transaction</p>
                    </div>
                </div>
                <div className="main-footer">
                    <div className="google-form" style={{backgroundColor: '#fff', padding: 30}}>
                        <h4 style={{textAlign: 'center'}}>Report Bug</h4>
                        <Form labelCol={{span: 7}}>
                            <Form.Item label='Email'>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Name'>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Feedback'>
                                <Input.TextArea style={{height: 100}} />
                            </Form.Item>
                            <Form.Item style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                                <Button disabled={true}>Send</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div>
                        {links.map((e,i) => (
                            <div>
                                <Link key={i} to={e.url} style={{
                                display: 'block'
                                }}>{e.name}</Link>
                                <Divider/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Spin>
    )
};

export default Main;