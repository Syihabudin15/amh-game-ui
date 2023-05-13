import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input, Spin, notification } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, UserUpdate } from '../../Reduxs/Actions/UserSlice';
import { LeftCircleFilled } from '@ant-design/icons';
import VerifyUser from "../../Components/Utils/VerifyUser";

function Setting(){
    const [disable, setDisable] = useState(true);
    const [show, setShow] = useState(false);
    const [first, setFirst] = useState();
    const [last, setLast] = useState();
    const {verified, firstName, lastName, phone, email, isLoading} = useSelector(state => state.user);
    const dis = useDispatch();

    const handleEdit = () => {
        setDisable(false);
        setShow(true);
    };
    const handleCancel = () => {
        setDisable(true);
        setShow(false);
    };

    const handleFinish = async () => {
        if(!first || !last){
            return notification.error({message: 'Firstname and Lastname is required'});
        }
        try{
            await dis(UserUpdate({firstName: first, lastName: last}));
            notification.success({message: 'Update Success'});
        }catch(err){
            notification.error({message: err.message});
        }
        setDisable(true);
        setShow(false);
    };

    useEffect(() => {
        dis(getUser());
        setFirst(firstName); // eslint-disable-next-line
        setLast(lastName); // eslint-disable-next-line
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
                                <Input value={first} disabled={disable} onChange={(e) => setFirst(e.target.value)} />
                            </Form.Item>

                            <Form.Item label='Last Name'>
                                <Input value={last} disabled={disable} onChange={(e) => setLast(e.target.value)} />
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
                    <Button className={show ? null : 'not-show'} onClick={() => handleFinish()}>Confirm</Button>
                </div>
            </section>
        </Fragment>
    )
};

export default Setting;