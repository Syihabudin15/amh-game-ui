import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyHeroHistory } from "../../Reduxs/Actions/HistoryMyHeroSlice";
import { Pagination, Table, Image } from "antd";

const base = process.env.BASE || 'http://localhost:5000';

function HistoryMyHero(){
    let [page, setPage] = useState(1);
    const {data, total} = useSelector(state => state.historyMyHero);
    const dis = useDispatch();
    const columns = [
        {title: 'Date', dataIndex: 'date'},
        {title: 'From', dataIndex: 'from', render: (user) => {
            return user? user : "Admin"
        }},
        {title: 'Receiver', dataIndex: 'receiver'},
        {title: 'Type', dataIndex: 'type', render: (type) => {
            return type === 'send' ? <p style={{color: 'red', fontWeight: 'bolder'}}>{type.toUpperCase()}</p> : <p style={{color: 'green', fontWeight: 'bolder'}}>{type.toUpperCase()}</p>
        }},
        {title: 'Image', dataIndex: 'image', render: (img) => {
            return <Image src={`${base}/img/${img}`} alt={img} width={'50px'} />
        }}
    ]

    useEffect(() => {
        dis(getAllMyHeroHistory(page));
    }, [page,dis]);
    return(
        <Fragment>
            <Table columns={columns} dataSource={data} style={{overflowX: 'auto'}}/>
            <Pagination total={total/10} className="pagination" onChange={(e) => setPage(e)}/>
        </Fragment>
    )
};

export default HistoryMyHero;