import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyHeroHistory } from "../../Reduxs/Actions/HistoryMyHeroSlice";
import { Pagination, Table } from "antd";

function HistoryMyHero(){
    let [page, setPage] = useState(1);
    const {data, total} = useSelector(state => state.historyMyHero);
    const dis = useDispatch();
    const columns = [
        {title: 'Date', dataIndex: 'createdAt'},
        {title: 'From', dataIndex: 'mUserId'},
        {title: 'Receiver', dataIndex: 'receiver'},
        {title: 'Type', dataIndex: 'type', render: (type) => {
            type === 'send' ? <p style={{color: 'red', fontWeight: 'bolder'}}>{type.toUpperCase()}</p> : <p style={{color: 'green', fontWeight: 'bolder'}}>{type.toUpperCase()}</p>
        }},
    ]

    useEffect(() => {
        dis(getAllMyHeroHistory(page));
    }, [page,dis]);
    return(
        <Fragment>
            <Table columns={columns} dataSource={data} />
            <Pagination total={total/10} className="pagination" onChange={(e) => setPage(e)}/>
        </Fragment>
    )
};

export default HistoryMyHero;