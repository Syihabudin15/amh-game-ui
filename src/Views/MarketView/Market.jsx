import { Pagination, Spin } from "antd";
import HeroCard from "../../Components/MarketComp/HeroCard";
import '../viewStyle.css';

function Market(){
    return(
        <Spin spinning={false}>
            <section title="market">
                <div className="list-hero-wrap">
                    <HeroCard/>
                    <HeroCard/>
                </div>
                <Pagination total={10} className="pagination" />
            </section>
        </Spin>
    )
};

export default Market;