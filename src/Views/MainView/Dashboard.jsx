import { Link } from 'react-router-dom';
import Biodata from "../../Components/Utils/Biodata";
import EventComp from '../../Components/EventComp/EventComp';

function Dashboard(){
    return(
        <section title="user dashboard">
            <h1 style={{textAlign: 'center', margin: 50}}>User Dashboard</h1>
            <div className="dashboard-top">
                <div className="bio-wrap">
                    <Biodata name='Name' value='Syihabudin Tsani' />
                    <Biodata name='Email' value='syihabudintsani15@gmail.com' />
                    <Biodata name='Phone' value='0881022157439' />
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
                <h3 style={{textAlign: 'center'}}>Events</h3>
                <EventComp />
                <EventComp />
                <EventComp />
            </section>
        </section>
    )
};

export default Dashboard;