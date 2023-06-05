import '../Games.css';

function ChildCard({ onClick, card, index, isInactive, isFlipped, isDisabled }){
    const handleClick = () => {
        !isFlipped && !isDisabled && onClick(index);
    };
    return(
        <div className={`child-card ${isFlipped ? 'is-flipped' : null} ${isInactive? 'is-inactive' : null}`}
            onClick={() => handleClick()}
        >
            <div className="card-face card-font-face">
                {/* <img src={img} alt="pokeball" />
                Font */}
            </div>
            <div className="card-face card-back-face">
                <img src={card.img} alt={card.name} />
            </div>
        </div>
    )
};

export default ChildCard;