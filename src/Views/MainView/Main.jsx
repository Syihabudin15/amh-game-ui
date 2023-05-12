import { Button } from "antd";

function Main(){
    return(
        <section title="main website">
            <div className="main-top">
                <div className="main-top-desc">
                    <h3 style={{fontSize: '2em', textAlign: 'center'}}>AMH GAME</h3>
                    <div>
                        <p>Fun And Earn with AMH GAME</p>
                    </div>
                    <div>
                        <p>Description Of the Platform. and any Text for Marketing.</p>
                        <p>Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div>
                    <div style={{marginTop: 30}}>
                        <p>Sign up now for Get Free Hero from AMH Drawing</p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', margin: '20px auto'}}>
                        <Button style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold'}}>Start Playing</Button>
                    </div>
                </div>
                <div className="main-top-img">
                    This is Section for Image
                </div>
            </div>
            <div className="main-feature">
                <div className="feature-img-game">
                    <p>Image of the game</p>
                </div>
                <div className="feature-carousel">
                    Feature with Carousel
                </div>
            </div>
            <div className="count-status">
                <div>
                    <p>1000 User</p>
                </div>
                <div>
                    <p>5000 Payment</p>
                </div>
                <div>
                    <p>50 Collections</p>
                </div>
                <div>
                    <p>500 Heroes</p>
                </div>
            </div>
            <div className="main-footer">
                <div className="google-form">
                    <p>Google Form Contact</p>
                </div>
                <div>
                    <p>list link</p>
                    <p>list link</p>
                    <p>list link</p>
                    <p>list link</p>
                </div>
            </div>
        </section>
    )
};

export default Main;