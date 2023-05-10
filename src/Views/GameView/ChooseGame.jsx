import { Row } from "antd";
import { Fragment } from "react";
import GameCard from "../../Components/GameComp/GameCard";


function ChooseGame(){
    return(
        <Fragment>
            <section title="choose-game" >
                <h3 style={{textAlign: 'center', margin: 50}}>Choose Game</h3>
                <section title="list game" className="list-game">
                    <Row>
                        <GameCard />
                        <GameCard />
                    </Row>
                </section>
                <section title="rules of the game" className="rules-game">
                    <h4>RULES</h4>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis doloribus quae natus! Omnis, tenetur repellat nisi ratione aut deserunt placeat obcaecati pariatur eius animi consequuntur esse odio delectus nihil maxime. Debitis, laboriosam. Praesentium ad consequatur commodi, minus non pariatur consectetur. Quam, ea repellendus ex pariatur voluptatem voluptas ad necessitatibus voluptatibus unde cumque quibusdam natus nobis numquam quidem adipisci eius amet officiis neque est, quasi impedit tempore? Voluptate illum hic perspiciatis sint dignissimos similique molestiae quis eligendi sapiente amet dolorem harum beatae voluptatibus, eaque, soluta repudiandae? Ipsum quisquam dolor, eum molestias similique magnam harum modi impedit, esse temporibus vitae officia accusamus.</p>
                    </div>
                </section>
            </section>
        </Fragment>
    )
};

export default ChooseGame;