import { Fragment } from 'react';
import WalletInfo from '../../Components/WalletComp/WalletInfo';
import '../viewStyle.css';
import { Button, Divider, Pagination, Select } from 'antd';

function MyWallet(){
    const options = [
        {label: 'Send', value: 'send'},
        {label: 'Withdraw', value: 'withdraw'}
    ];
    return(
        <Fragment>
            <section title="wallet">
                <section className='wallet-balance'>
                    <WalletInfo/>
                    <div className='wallet-transaction'>
                        <Button>Send</Button>
                        <Button>Withdraw</Button>
                    </div>
                </section>
                <Divider/>
                <section title='history'>
                    <div className='history-top'>
                        <h3>History</h3>
                        <Select placeholder='Filter' options={options} style={{padding: 10}} allowClear />
                    </div>
                    <Pagination total={10} className='pagination' />
                </section>
            </section>
        </Fragment>
    )
};

export default MyWallet;