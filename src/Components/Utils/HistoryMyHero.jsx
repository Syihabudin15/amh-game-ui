import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllMyHeroHistory } from "../../Reduxs/Actions/HistoryMyHeroSlice";

function HistoryMyHero(){
    let [page, setPage] = useState(1);
    const dis = useDispatch();

    useEffect(() => {
        dis(getAllMyHeroHistory(page));
    }, [dis]);
    return(
        <Fragment>
            <p onClick={() => setPage(1)}>History My Hero Transaction</p>
        </Fragment>
    )
};

export default HistoryMyHero;