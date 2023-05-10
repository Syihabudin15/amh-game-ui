import { Divider, Input, Pagination, Spin } from "antd";
import '../viewStyle.css';
import { Fragment } from "react";
import CollectionCard from "../../Components/MarketComp/CollectionCard";

function Market(){
    return(
        <Fragment>
            <div className="search">
                <Input.Search placeholder="Collection Name" className="input-search"/>
            </div>
            <Divider/>
            <Spin spinning={false}>
                <section title="market">
                    <div className="list-hero-wrap">
                        <CollectionCard/>
                    </div>
                    <Pagination total={10} className="pagination" />
                </section>
            </Spin>
        </Fragment>
    )
};

export default Market;