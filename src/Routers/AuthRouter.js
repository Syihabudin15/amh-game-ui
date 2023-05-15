import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '../Views/AuthView/SignUp';
import SignIn from '../Views/AuthView/SignIn';

function AuthRouter(){
    return(
        <Routes>
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/sign-in' element={<SignIn/>} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    )
};

export default AuthRouter;