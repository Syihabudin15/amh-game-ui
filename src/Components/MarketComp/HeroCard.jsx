import { Button, Image, Modal } from "antd";
import '../compStyle.css';
import { Fragment, useState } from "react";

function HeroCard({data}){
    const [isOpen, setOpen] = useState(false);

    const buyClick = () => {
        console.log("buy clicked");
    };
    return(
        <Fragment>
            <div className="hero-card">
                <Image src={`https://amh-game-api.up.railway.app/img/${data.img}`} alt={data.level} width={140} height={130}/>
                <div className="button-card">
                    <Button type="primary" onClick={() => setOpen(true)} block>Detail</Button>
                </div>
            </div>
            <Modal open={isOpen} footer={[
                <Button onClick={() => buyClick()}>Buy</Button>, 
                <Button onClick={() => setOpen(false)}>Close</Button>
            ]} onCancel={() => setOpen(false)}>

            </Modal>
        </Fragment>
    )
};


export default HeroCard;