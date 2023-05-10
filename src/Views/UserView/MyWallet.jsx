import { Fragment} from 'react';
import WalletInfo from '../../Components/WalletComp/WalletInfo';
import { SendBalance, Deposit, Withdraw } from '../../Components/WalletComp/WalletModal';
import { Divider, Pagination, Select, Table } from 'antd';
import '../viewStyle.css';


function MyWallet(){

    const options = [
        {label: 'Send', value: 'send'},
        {label: 'Withdraw', value: 'withdraw'}
    ];

    const columns = [
        {title: 'NO', dataIndex: 'no'},
        {title: 'Date', dataIndex: 'date'},
        {title: 'Amount', dataIndex: 'amount'},
        {title: 'To', dataIndex: 'to'},
        {title: 'Status', dataIndex: 'status'}
    ];

    return(
        <Fragment>
            <section title="wallet">
                <section className='wallet-balance'>
                    <WalletInfo/>
                    <div className='wallet-transaction'>
                        <SendBalance />
                        <Deposit />
                        <Withdraw />
                    </div>
                </section>
                <Divider/>
                <section title='history'>
                    <div className='history-top'>
                        <h3>History</h3>
                        <Select placeholder='Filter' options={options} style={{padding: 10}} allowClear />
                    </div>
                    <div>
                        <Table columns={columns}  style={{margin: 20}}/>
                    </div>
                    <Pagination total={10} className='pagination' />
                </section>
            </section>
        </Fragment>
    )
};

export default MyWallet;