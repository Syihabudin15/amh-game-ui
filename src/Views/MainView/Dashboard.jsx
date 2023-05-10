import { Link } from 'react-router-dom';
import Biodata from "../../Components/Utils/Biodata";
import EventComp from '../../Components/EventComp/EventComp';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../Reduxs/Actions/UserSlice';

function Dashboard(){
    const user = useSelector(state => state.user);
    const dis = useDispatch();
    useEffect(() => {
        dis(getUser());
    }, [dis]);
    
    return(
        <Spin spinning={user.isLoading}>
            <section title="user dashboard">
                <h1 style={{textAlign: 'center', margin: 50, textShadow: '4px 4px 4px #aaa'}}>Hello {user.firstName ? user.firstName : 'and Welcome'}</h1>
                <div className="dashboard-top">
                    <div className="bio-wrap">
                        <Biodata name='Name' value={user.firstName ? `${user.firstName} ${user.lastName}` : 'Not Set'} />
                        <Biodata name='Email' value={user.email} />
                        <Biodata name='Phone' value={user.phone} />
                        <Biodata name='Status' value={user.verified ? 'Verified' : 'Not Verified'} />
                        <Biodata name={<Link to='/user/my-hero'>Hero</Link>} value='1' />
                        <p style={{textAlign: 'right', fontStyle: 'italic', marginTop: 30}}>
                            <Link to='/user/setting'>Setting</Link>
                        </p>
                    </div>
                    <div className="adds-wrap">
                        <p>Adds Here</p>
                    </div>
                </div>

                <section title='list event' className='event-wrap'>
                    <h3 style={{textAlign: 'center'}}>Active Events</h3>
                    <EventComp />
                    <EventComp />
                    <EventComp />
                </section>
            </section>
        </Spin>
    )
};

export default Dashboard;