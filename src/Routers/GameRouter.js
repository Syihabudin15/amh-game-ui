import { Route, Routes, Navigate } from "react-router-dom";
import ChooseGame from "../Views/GameView/ChooseGame";

function GameRouter(){
    return(
        <Routes>
            <Route path="/choose" element={<ChooseGame/>} />
        </Routes>
    )
};


export default GameRouter;