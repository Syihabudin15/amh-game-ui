import { Link } from 'react-router-dom';
import { GithubFilled, FacebookFilled, TwitterCircleFilled, MediumCircleFilled, CopyrightOutlined } from '@ant-design/icons';

function Footer(){
    const sosmeds = [
        {name: 'Github', icon: <GithubFilled/>, link:'https://github.com/syihabudin15'},
        {name: 'Facebook', icon: <FacebookFilled />, link: 'https://facebook.com/sfikri2001'},
        {name: 'Twitter', icon: <TwitterCircleFilled />, link: 'https://twitter.com/TsaniSyihabudin'},
        {name: 'Medium', icon: <MediumCircleFilled />, link: 'https://medium.com/syihabudin15'}
    ];

    return(
        <section title="footer" className="footer">
            <div className="top-footer">
                {sosmeds.map((e) => (
                    <div className="sosmed">
                        <span>
                            {e.icon}
                            <Link to={e.link} style={{marginLeft: 5}}>{e.name}</Link>
                        </span>
                    </div>
                ))}
            </div>
            <div className="bottom-footer">
                <i>Copyright<CopyrightOutlined style={{fontSize: 10}} /> AMHGAME 2023</i>
            </div>
        </section>
    )
};


export default Footer;