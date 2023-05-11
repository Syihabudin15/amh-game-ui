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
    const [search, setSearch] = useState(false);
    const dis = useDispatch();

    const handleLevel = (e) => {
        if(!e){
            return setSearch(false);
        }
        setSearch(true);
        dis(SearchByLevel({page: 1, level: e}));
    };

    const handlePrice = (e) => {
        setMax(parseInt(e.target.value));
        setSearch(true);
        dis(SearchByPrice({page: 1, min: min, max: max}));
    };

    useEffect(() => {
        setSearch(false);
        dis(getAllHeroes(page)); // eslint-disable-next-line
    }, [page]);

    return(
        <Fragment>
            <div className="search">
                <Input placeholder="Collection Name" className="input-search" 
                    onChange={(e) => dis(SearchByCollectionName({page,name: e.target.value}))}
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
                <section title="list hero marketplace">
                        {
                            total === 0 ? <p style={{opacity: '.4', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>Not Found</p> : 
                            heroes.map((e,i) => (
                                <div className="list-hero-wrap" key={i}>
                                    <HeroCard data={e} />
                                </div>
                            ))
                        }
                </section>
            </Spin>
            <Pagination total={total/10} onChange={(e) => setPage(e)} defaultCurrent={page} className={'pagination'+(search? 'disable-pagination' : '')}/>
        </Fragment>
    )
};

export default Marketplace;