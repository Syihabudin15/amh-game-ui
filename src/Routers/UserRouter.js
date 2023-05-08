import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Views/MainView/Dashboard';

function UserRouter(){
    return(
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
    )
};

export default UserRouter;