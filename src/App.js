import { Fragment } from "react";
import Menu from "./Components/MenuComp/Menu";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./Routers/MainRouter";
import AuthRouter from "./Routers/AuthRouter";


function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Menu/>
        <AuthRouter/>
        <MainRouter/>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
