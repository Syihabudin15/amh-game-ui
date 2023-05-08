import { Image } from 'antd';
import { Link } from 'react-router-dom';

function EventComp(){
    return(
        <div className='event-comp'>
            <Link to={`/blog/event`}><p>Event will Showing here</p></Link>
            <Image src='#' className='event-img'/>
        </div>
    )
};

export default EventComp;