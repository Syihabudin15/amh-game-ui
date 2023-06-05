import { Route, Routes } from "react-router-dom";
import ChooseGame from "../Views/GameView/ChooseGame";
import MemoryCard from "../Views/GameView/MemoryCard/MemoryCard";
import Flappy from "../Views/GameView/Flappy/Flappy";

function GameRouter(){
    return(
        <Routes>
            <Route path="/choose" element={<ChooseGame/>} />
            <Route path="/memory/:id" element={<MemoryCard/>} />
            <Route path="/flappy/:id" element={<Flappy/>} />
        </Routes>
    )
};


export default GameRouter;