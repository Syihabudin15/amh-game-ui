import { Fragment } from "react";
import { Divider, Input, Pagination, Select } from "antd";
import HeroCard from "../../Components/MarketComp/HeroCard";

function Marketplace(){
    return(
        <Fragment>
            <div className="search">
                <Input placeholder="Collection Name" className="input-search"/>
                <Select options={[
                    {label: 'Level 1', value: 1},
                    {label: 'Level 2', value: 2}
                ]} placeholder='Level' allowClear style={{padding: 5}} />
                <div className="price-range">
                    <Input placeholder="price" /> <Input placeholder="range" />
                </div>
            </div>
            <Divider/>
            <section title="list hero marketplace">
                <div className="list-hero-wrap">
                    <HeroCard/>
                </div>
            </section>
            <Pagination total={10} className="pagination"/>
        </Fragment>
    )
};

export default Marketplace;