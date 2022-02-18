import { YMaps } from "react-yandex-maps";
import MapContainer from "./containers/MapContainer";
import LeftMenuContainer from "./containers/LeftMenuContainer";

var Content = () => {
    return (
        <div className="d-flex border border-secondary h-100 bg-light">
            <YMaps>
            <LeftMenuContainer />
                <MapContainer />
            </YMaps>
        </div>
    )
}

export default Content;