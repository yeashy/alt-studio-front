import { useSelector } from "react-redux";
import Content from "./Content";
import Greetings from "./Greetings";
import Header from "./Header";

var MainPage = () => {

    let isLogged = useSelector(state => state.mapSection.user.isLogged);

    function whichScreen() {
        if (isLogged) return <Content />;
        else return <Greetings/>;
    }

    return (
        <div className="h-100" id="content">
            <Header />
            <div className="container-md py-3" style={{ height: 'calc(100% - 50px)' }}>
                {whichScreen()}
            </div>
        </div>
    )
}

export default MainPage;