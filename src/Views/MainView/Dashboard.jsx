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
    // eslint-disable-next-line 
    return(
        <Spin spinning={user.isLoading}>
            <section title="user dashboard">
                <h1 style={{textAlign: 'center', margin: 50, textShadow: '4px 4px 4px #aaa'}}>Hello {user.firstName ? user.firstName : 'and Welcome'}</h1>
                <div className="dashboard-top">
                    <div className="bio-wrap">
                        <Biodata user={user} />
                        <p className='link-setting'>
                            <Link to='/user/setting'>Setting</Link>
                        </p>
                    </div>
                    <div className="adds-wrap">
                        <a href="https://rollercoin.com/?r=kk1kson4">
                            <img src="https://static.rollercoin.com/static/img/ref/gen2/w320h100.gif"/> 
                        </a> 
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