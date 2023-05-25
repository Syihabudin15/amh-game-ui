import { Link } from 'react-router-dom';
import Biodata from "../../Components/Utils/Biodata";
import EventComp from '../../Components/EventComp/EventComp';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../Reduxs/Actions/UserSlice';
import { getActiveEvent } from '../../Reduxs/Actions/EventSlice';
import ListMyEvent from '../../Components/Utils/ListMyEvent';

function Dashboard(){
    const user = useSelector(state => state.user);
    const events = useSelector(state => state.events);
    const dis = useDispatch();
    useEffect(() => {
        dis(getUser());
        dis(getActiveEvent({page: 1}));
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
                            <img src="https://static.rollercoin.com/static/img/ref/gen2/w320h100.gif" alt="rollercoin"/> 
                        </a> 
                    </div>
                </div> 

                <section title='list event' className='event-wrap'>
                    <h3 style={{textAlign: 'center'}}>Active Events</h3>
                    {
                        events.data.total > 0  ? events.data.map((e,i) => (
                            <EventComp data={e} key={i} />
                        )) : <p style={{
                            textAlign: 'center', fontWeight: 'bold', margin: '50px auto', fontStyle: 'italic', opacity: .5, textDecoration: 'underline'
                        }}>Stay Tuned</p>
                    }
                </section>

                <section title='my event' className='my-event-wrap'>
                    <h3 style={{textAlign: 'center'}}>My Events</h3>
                    <div className='list-my-event'>
                        <ListMyEvent/>
                    </div>
                </section>
            </section>
        </Spin>
    )
};

export default Dashboard;