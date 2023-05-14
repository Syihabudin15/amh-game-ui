import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pagination, Spin } from "antd";
import HeroCard from "../../Components/MarketComp/HeroCard";
import { LeftCircleFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getHeroCollections } from "../../Reduxs/Actions/HeroesSlice";


function MarketHero(){
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const {loading, total, heroes, name} = useSelector(state => state.heroes); 
    const dis = useDispatch();

    useEffect(() => {
        dis(getHeroCollections({page, id}));
    }, [dis, page, id]);
    return(
        <Fragment>
            <div style={{margin: '10px 0 0 10px', position: 'fixed', zIndex: 9999}}>
                <Link to='/market'>
                    <LeftCircleFilled style={{margin: '0 10px'}}/>
                    <i style={{fontWeight: 'bold', textShadow: '4px 4px 4px #aaa'}}>Back</i>
                </Link>
            </div>
            <h2 
                style={{textAlign: 'center', margin: '50px 0 30px 0', fontStyle: 'italic', textShadow: '2px 2px #bbb'}}
            >
                {name}
            </h2>
            <Spin spinning={loading}>
                <section title="list hero marketplace" className="list-hero-wrap">
                    {total === 0 ? <p style={{opacity: '.4', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>Not Found</p> : 
                        heroes.map((e,i) => (
                            <div key={i}>
                                <HeroCard data={e}/>
                            </div>
                        ))
                    }
                </section>
            </Spin>
            <Pagination total={total /10} className="pagination" defaultCurrent={page} onChange={(e) => setPage(e)}/>
        </Fragment>
    )
};

export default MarketHero;