import { Button, Image, Modal } from "antd";
import '../compStyle.css';
import { useState } from "react";

function HeroCard(){
    const [open, setOpen] = useState(false);
    return(
        <div className="hero-card">
            <Image src='#' alt='hero 1' />
            <div className="button-card">
                <Button disabled>Buy</Button>
                <Button onClick={() => setOpen(true)}>Detail</Button>
            </div>
            <Modal title='Detail Hero' open={open} onCancel={() => setOpen(false)}>
                <p>Level 1</p>
            </Modal>
        </div>
    )
};

export default HeroCard;