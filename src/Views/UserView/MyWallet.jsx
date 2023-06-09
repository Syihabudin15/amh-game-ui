import { Fragment, useEffect, useState} from 'react';
import { SendBalance, Deposit, Withdraw } from '../../Components/WalletComp/WalletModal';
import { BankTwoTone } from '@ant-design/icons';
import { Col, Divider, Select, Spin, Table, Row, Typography } from 'antd';
import '../viewStyle.css';
import { useSelector, useDispatch } from 'react-redux';
import { getWallet } from '../../Reduxs/Actions/WalletSlice';
import { getHistoryWallet } from '../../Reduxs/Actions/WalletHistorySlice';


function MyWallet(){
    const {balance, noWallet, isLoading} = useSelector(state => state.wallet);
    const {data, loading} = useSelector(state => state.historyWallet);
    const [type, setType] = useState('deposit');
    const dis = useDispatch();

    const options = [
        {label: 'Send', value: 'send'},
        {label: 'Receive', value: 'receive'},
        {label: 'Withdraw', value: 'withdraw'},
        {label: 'Deposit', value: 'deposit'}
    ];

    const columns = [
        {title: 'Date', dataIndex: 'date', render: (e) => (
            <p>{new Date(e).toDateString()}</p>
        )},
        {title: 'Amount', dataIndex: 'amount'},
        {title: 'To', dataIndex: 'to'},
        {title: 'Type', dataIndex: 'type', render: (type) => (<p>{type.toUpperCase()}</p>)},
        {title: 'Status', dataIndex: 'status', render: (e) => (
            e === 'SUCCEEDED' ? <p style={{color: 'green', fontWeight: 'bold'}}>{e}</p> : <p style={{color: 'blue', fontWeight: 'bold'}}>{e}</p>
        )}
    ];

    const handleFilter = (e) => {
        if(!e){
            return 
        }
        setType(e)
    };

    useEffect(() => {
        dis(getWallet());
        dis(getHistoryWallet(type));
    }, [dis, type]);

    return(
        <Fragment>
            <Spin spinning={isLoading}>
                <section title="wallet">
                    <section className='wallet-balance'>
                        <div>
                            <BankTwoTone className='bank-logo' />
                        </div>
                        <div className='balance-info'>
                            <Row>
                                <Col span={10} className='bold-info'>Balance</Col>
                                <Col span={3}>:</Col>
                                <Col span={10}><i className='bold-info' style={{marginRight: 5}}>Rp.</i> {balance}</Col>
                            </Row>
                            <Row>
                                <Col span={10} className='bold-info'>No Wallet</Col>
                                <Col span={3}>:</Col>
                                <Col span={10} style={{display: 'flex', flexWrap: 'nowrap', paddingTop: 2}}>
                                    {noWallet} <Typography.Paragraph copyable={{text: noWallet}} style={{paddingTop: 3, paddingLeft: 8}}></Typography.Paragraph>
                                </Col>
                            </Row>
                        </div>
                        <div className='wallet-transaction'>
                            <SendBalance />
                            <Deposit />
                            <Withdraw />
                        </div>
                    </section>
                    <Divider/>
                    <div className='add-wrap-mywallet'>                        
						<a href="https://rollercoin.com/?r=kk1kson4">
							<img src="https://static.rollercoin.com/static/img/ref/gen2/w970h90.gif" alt="970h90"/>
						</a>
                    </div>
                    <section title='history'>
                        <div className='history-top'>
                            <h3>History</h3>
                            <Select placeholder='Filter' options={options} style={{padding: 10}} allowClear onChange={(e) => handleFilter(e)} />
                        </div>
                        <div>
                            <Spin spinning={loading}>
                                <Table columns={columns} dataSource={data}  style={{margin: 20, overflowY: 'auto'}} pagination/>
                            </Spin>
                        </div>
                    </section>
                </section>
            </Spin>
        </Fragment>
    )
};

export default MyWallet;