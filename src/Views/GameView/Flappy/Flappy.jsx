import { Fragment, useEffect } from "react";
import $ from 'jquery';
function Flappy(){
    useEffect(() => {
        setInterval(() => {
            $('.img-bird-wrap').animate({top: '+=10px'}, 10, 'linear');
        }, 500);

        let birdPos = $('.img-bird-wrap').position().top;
        $('body').keydown(e => {
            if(e.key === 'ArrowUp' && birdPos > 40){
                console.log(birdPos);
                $('.img-bird-wrap').animate({top: '-=15px'}, 10, 'linear');
            }
        });
    });

    return(
        <Fragment>
            <h2 className="title-game">Flappy Game</h2>
            <div className="flappy-wrap">
                <div className="img-bird-wrap">
                </div>
            </div>
        </Fragment>
    )
};

export default Flappy;