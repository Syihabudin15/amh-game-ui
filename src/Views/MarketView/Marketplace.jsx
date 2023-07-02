import { Fragment, useEffect, useState } from "react";
import { Divider, Input, Pagination, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllHeroes, SearchByLevel, SearchByPrice, SearchByCollectionName } from "../../Reduxs/Actions/HeroesSlice";
import HeroCardMarketPlace from "../../Components/MarketComp/HeroCardMarketplace";

function Marketplace(){
    const {heroes, loading, total} = useSelector(state => state.heroes);
    const [page, setPage] = useState(1);
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [name, setName] = useState();
    const [level, setLevel] = useState();
    const dis = useDispatch();

    useEffect(() => {
        if(max && min ){
            dis(SearchByPrice({page, min, max}));
        }
        else if(name){
            dis(SearchByCollectionName({page, name}));
        }
        else if(level){
            dis(SearchByLevel({page, level}));
        }
        else{
            dis(getAllHeroes(page)); // eslint-disable-next-line
        }
    }, [page, min, max, level, name, dis]);
    
    return(
        <Fragment>
            <div className="search">
                <Input placeholder="Collection Name" className="input-search" 
                    onChange={(e) => setName(e.target.value)}
                />
                <Select onChange={(e) => setLevel(e)} options={[
                    {label: 'Level 1', value: 1},
                    {label: 'Level 2', value: 2}
                ]} placeholder='Level' allowClear style={{padding: 5}} />
                <div className="price-range">
                    <Input placeholder="price" type="number" onChange={(e) => setMin(e.target.value)} />
                    <Input placeholder="range" type="number" onChange={(e) => setMax(e.target.value)} />
                </div>
            </div>
            <Divider/>
            <Spin spinning={loading}>
                <section title="list hero marketplace" className="list-hero-wrap">
                        {
                            total === 0 ? <p style={{opacity: '.4', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>Not Found</p> : 
                            heroes.map((e,i) => (
                                <div key={i}>
                                    <HeroCardMarketPlace data={e} />
                                </div>
                            ))
                        }
                </section>
            </Spin>
            <Pagination total={total/10} onChange={(e) => setPage(e)} defaultCurrent={page} className={'pagination'} />
        </Fragment>
    )
};

export default Marketplace;
