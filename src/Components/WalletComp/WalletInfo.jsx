import { Fragment } from "react";
import { BankTwoTone } from '@ant-design/icons';

function WalletInfo({balance, noWallet}){
    return(
        <Fragment>
            <div>
                <BankTwoTone className='bank-logo'/>
            </div>
            <div>
                <div className="col-info">
                    <p style={{fontWeight: 'bold', fontSize: '1.2em'}}>Balance</p> <p>:</p> <p style={{wordSpacing: 10}}><span style={{fontWeight: 'bold', fontStyle: 'italic'}}>Rp.</span> {balance}</p>
                </div>
                <div className="col-info">
                    <p style={{fontWeight: 'bold', fontSize: '1.2em'}}>No Wallet</p> <p>:</p> <p style={{fontStyle: 'italic'}}>{noWallet}</p>
                </div>
            </div>
        </Fragment>
    )
};

export default WalletInfo;