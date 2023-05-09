import { Button, Image, Modal } from "antd";
import '../compStyle.css';
import { Fragment, useState } from "react";

function HeroCard(){
    const [isOpen, setOpen] = useState(false);

    const buyClick = () => {
        console.log("buy clicked");
    };
    return(
        <Fragment>
            <div className="hero-card">
                <Image src='#' alt='hero 1' />
                <div className="button-card">
                    <Button type="primary" onClick={() => setOpen(true)}>Detail</Button>
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