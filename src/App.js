import { Fragment, useEffect, useState } from "react";
import MainRouter from "./Routers/MainRouter";
import AuthRouter from "./Routers/AuthRouter";
import { useDispatch } from "react-redux";
import { getUser } from "./Reduxs/Actions/UserSlice";
import { Spin } from "antd";
import Cookies from "js-cookie";
import MenuWrapper from "./Components/MenuComp/Menu";
import { setLogin } from "./Reduxs/Actions/MenuSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = Cookies.get('auth-token');
    if(token){
      dispatch(getUser());
      dispatch(setLogin(true));
    }
    setLoading(false);
  }, [dispatch]);
  return (
    <Spin spinning={loading}>
        <Fragment>
          <MenuWrapper/>
          <AuthRouter/>
          <MainRouter/>
        </Fragment>
    </Spin>
  );
}

export default App;
