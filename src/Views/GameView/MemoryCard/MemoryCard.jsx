import { Fragment, useState, useRef, useEffect } from "react";
import { ShuffleCard } from "../UtilsFunc";
import { DataMemoryCard } from "../DataGame";
import '../Games.css';
import ChildCard from "./ChildCard";
import { useParams } from "react-router-dom";
import ClaimReward from "../../../Components/GameComp/ClaimReward";

function MemoryCard(){
    const {id} = useParams();
    const [cards, setCards] = useState(() => ShuffleCard(DataMemoryCard.concat(DataMemoryCard)));
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const timeout = useRef(null);
    const disable = () => {
        setShouldDisableAllCards(true);
    };
    const enable = () => {
        setShouldDisableAllCards(false);
    };
    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === DataMemoryCard.length) {
            setShowModal(true);
        }
    };
    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].id === cards[second].id) {
            setClearedCards((prev) => ({ ...prev, [cards[first].id]: true }));
            setOpenCards([]);
            return;
        }
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };
    const handleCardClick = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            disable();
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };
    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300);
        }
        return () => {
            clearTimeout(timeout);
        };// eslint-disable-next-line
    }, [openCards]); 
    
    useEffect(() => {
        checkCompletion(); // eslint-disable-next-line
    }, [clearedCards]);
    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };
    
    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.id]);
    };
    
    const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setShouldDisableAllCards(false);
        setCards(ShuffleCard(DataMemoryCard.concat(DataMemoryCard)));
    };

    return(
        <Fragment>
            <h2 className="title-game">Memory Card Game</h2>
            <section title="Memory Card Game" >
                <div className="memory-card-game">
                    {cards && cards.map((card,index) => (
                        <ChildCard 
                            key={index}
                            card={card}
                            index={index}
                            isDisabled={shouldDisableAllCards}
                            isInactive={checkIsInactive(card)}
                            isFlipped={checkIsFlipped(index)}
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
            </section>
            <ClaimReward id={id} open={showModal} restart={handleRestart} />
        </Fragment>
    )
};

export default MemoryCard;