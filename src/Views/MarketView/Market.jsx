import { Divider, Input, Pagination, Select, Spin } from "antd";
import HeroCard from "../../Components/MarketComp/HeroCard";
import '../viewStyle.css';
import { Fragment } from "react";

function Market(){
    return(
        <Fragment>
            <div className="search">
                <Input.Search placeholder="Collection Name" className="input-search"/>
                <Select options={[
                    {label: 'Level 1', value: 1},
                    {label: 'Level 2', value: 2}
                ]} placeholder='Level' allowClear style={{padding: 5}} />
            </div>
            <Divider/>
            <Spin spinning={false}>
                <section title="market">
                    <div className="list-hero-wrap">
                        <HeroCard/>
                        <HeroCard/>
                    </div>
                    <Pagination total={10} className="pagination" />
                </section>
            </Spin>
        </Fragment>
    )
};

export default Market;