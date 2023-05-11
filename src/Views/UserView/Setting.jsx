import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../Reduxs/Actions/UserSlice';
import { LeftCircleFilled } from '@ant-design/icons';
import VerifyUser from "../../Components/Utils/VerifyUser";

function Setting(){
    const [disable, setDisable] = useState(true);
    const [show, setShow] = useState(false);
    const {verified, firstName, lastname, phone, email, isLoading} = useSelector(state => state.user);
    const dis = useDispatch();

    const handleEdit = () => {
        setDisable(false);
        setShow(true);
    };
    const handleCancel = () => {
        setDisable(true);
        setShow(false);
    };

    useEffect(() => {
        dis(getUser());
    }, [dis]);

    return(
        <Fragment>
            <div style={{margin: 10, position: 'fixed'}}>
                <Link to='/user/dashboard'>
                    <LeftCircleFilled style={{margin: '0 10px'}}/>
                    <i style={{fontWeight: 'bold', textShadow: '4px 4px 4px #aaa'}}>Dashboard</i>
                </Link>
            </div>
            <section title="setting" className="setting">
                <h2 style={{textAlign: 'center', marginBottom: 50}}>Setting</h2>
                <div>
                    <Spin spinning={isLoading}>
                        <Form labelCol={{span: 5}}>
                            <Form.Item label='First Name'>
                                <Input value={firstName} disabled={disable} />
                            </Form.Item>

                            <Form.Item label='Last Name'>
                                <Input value={lastname} disabled={disable} />
                            </Form.Item>

                            <Form.Item label='Phone Number'>
                                <Input value={phone} disabled={true} />
                            </Form.Item>
                            
                            <Form.Item label='Email'>
                                <Input value={email} disabled={true} />
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'center', gap: 70, marginTop: 50, alignItems: 'center'
                }}>
                    {verified ? null : <VerifyUser/>}
                    <Link >
                        <i>Change Password</i>
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