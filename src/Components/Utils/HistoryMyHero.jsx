import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllMyHeroHistory } from "../../Reduxs/Actions/HistoryMyHeroSlice";
import { Pagination, Table } from "antd";

function HistoryMyHero(){
    let [page, setPage] = useState(1);
    const dis = useDispatch();
    const columns = [
        {title: 'Date', dataIndex: 'date'},
        {title: 'From', dataIndex: 'from'},
        {title: 'Receiver', dataIndex: 'receiver'},
        {title: 'Type', dataIndex: 'type', render: (type) => {
            type === 'send' ? <p style={{color: 'red'}}>{type.toUpperCase()}</p> : <p style={{color: 'green'}}>{type.toUpperCase()}</p>
        }},
    ]

    useEffect(() => {
        dis(getAllMyHeroHistory(page));
    }, [page,dis]);
    return(
        <Fragment>
            <Table columns={columns} />
            <Pagination className="pagination" onChange={(e) => setPage(e)}/>
        </Fragment>
    )
};

export default HistoryMyHero;