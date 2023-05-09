import { Fragment } from "react";
import { BankTwoTone } from '@ant-design/icons';

function WalletInfo(){
    return(
        <Fragment>
            <div>
                <BankTwoTone className='bank-logo'/>
            </div>
            <div>
                <div className="col-info">
                    <p>Balance</p> <p>:</p> <p>100000</p>
                </div>
                <div className="col-info">
                    <p>No Wallet</p> <p>:</p> <p>1138082115670361</p>
                </div>
            </div>
        </Fragment>
    )
};

export default WalletInfo;