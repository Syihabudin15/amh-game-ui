import { Image, Col, Button } from "antd";
import { Fragment } from "react";

function GameCard(){
    return(
        <Fragment>
            <Col className="col-game">
                <Image src="#" />
                <div>
                    <p>Game Name</p>
                    <p>Description : </p>
                    <p style={{height: 100, overflowY: 'auto'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, tempore iusto aspernatur culpa quaerat possimus impedit. Quos deserunt fugiat consequatur!</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type="primary">Play Game</Button>
                </div>
            </Col>
        </Fragment>
    )
};

export default GameCard;