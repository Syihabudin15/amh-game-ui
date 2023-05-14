import { Divider, Input, Pagination, Spin } from "antd";
import '../viewStyle.css';
import { Fragment, useEffect, useState } from "react";
import CollectionCard from "../../Components/MarketComp/CollectionCard";
import { useDispatch, useSelector } from "react-redux";
import { SearchCollectionName, getAllCollection } from "../../Reduxs/Actions/CollectionSlice";

function Market(){
    const [page, setPage] = useState(1);
    const {loading, total, collections} = useSelector(state => state.collections);
    const dis = useDispatch();

    useEffect(() => {
        dis(getAllCollection(page));// eslint-disable-next-line
    }, []);
    return(
        <Fragment>
            <div className="search">
                <Input.Search placeholder="Collection Name" onChange={(e) => dis(SearchCollectionName({page,name: e.target.value}))}  className="input-search"/>
            </div>
            <Divider/>
            <Spin spinning={loading}>
                <section title="market">
                    {total === 0 ? <p style={{opacity: '.4', fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center'}}>Not Found</p> : 
                        collections.map((e,i) => (
                            <div className="list-hero-wrap" key={i}>
                                <CollectionCard data={e}/>
                            </div>
                        ))
                    }
                    <Pagination total={total/10} className="pagination" defaultCurrent={page} onChange={(e) => setPage(e)} />
                </section>
            </Spin>
        </Fragment>
    )
};

export default Market;