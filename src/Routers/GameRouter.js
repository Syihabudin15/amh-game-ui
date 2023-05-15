import { Route, Routes, Navigate } from "react-router-dom";
import ChooseGame from "../Views/GameView/ChooseGame";

function GameRouter(){
    return(
        <Routes>
            <Route path="/choose" element={<ChooseGame/>} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
};


export default GameRouter;