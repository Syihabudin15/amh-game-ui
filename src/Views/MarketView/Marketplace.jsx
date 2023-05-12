import { Fragment, useEffect, useState } from "react";
import { Divider, Input, Pagination, Select, Spin } from "antd";
import HeroCard from "../../Components/MarketComp/HeroCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllHeroes, SearchByLevel, SearchByPrice, SearchByCollectionName } from "../../Reduxs/Actions/HeroesSlice";

function Marketplace(){
    const {heroes, loading, total} = useSelector(state => state.heroes);
    const [page, setPage] = useState(1);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const dis = useDispatch();

    const handleLevel = (e) => {
        if(!e){
            return 
        }
        dis(SearchByLevel({page: 1, level: e}));
    };

    const handleSearchName = (e) => {
        if(!e.target.value){
            return 
        }
        dis(SearchByCollectionName({page,name: e.target.value}));
    };

    const handlePrice = (e) => {
        if(!e.target.value || !min){
            return 
        }
        setMax(parseInt(e.target.value));
        dis(SearchByPrice({page: 1, min: min, max: max}));
    };

    useEffect(() => {
        dis(getAllHeroes(page)); // eslint-disable-next-line
    }, [page]);

    return(
        <Fragment>
            <div className="search">
                <Input placeholder="Collection Name" className="input-search" 
                    onChange={(e) => handleSearchName(e)}
                />
                <Select onChange={(e) => handleLevel(e)} options={[
                    {label: 'Level 1', value: 1},
                    {label: 'Level 2', value: 2}
                ]} placeholder='Level' allowClear style={{padding: 5}} />
                <div className="price-range">
                    <Input placeholder="price" onChange={(e) => setMin(parseInt(e.target.value))} />
                    <Input placeholder="range" onChange={(e) => handlePrice(e)} />
                </div>
            </div>
            <Divider/>
            <Spin spinning={loading}>
                <section title="list hero marketplace" className="list-hero-wrap">
                        {
                            total === 0 ? <p style={{opacity: '.4', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>Not Found</p> : 
                            heroes.map((e,i) => (
                                <div key={i}>
                                    <HeroCard data={e} />
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