import { Button, Form, Input } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';

const base = process.env.BASE || 'http://localhost:5000';

function Main(){
    console.log(base);
    return(
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
                        <Button style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold'}}>Start Playing</Button>
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
                    <p>1000 User</p>
                </div>
                <div>
                    <p>5000 Payment</p>
                </div>
                <div>
                    <p>50 Collections</p>
                </div>
                <div>
                    <p>500 Heroes</p>
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
                    <p>list link</p>
                    <p>list link</p>
                    <p>list link</p>
                    <p>list link</p>
                </div>
            </div>
        </section>
    )
};

export default Main;