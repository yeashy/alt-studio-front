import { Map, Placemark } from "react-yandex-maps";
import createReactClass from "create-react-class"
import { connect } from "react-redux"

var innerMapContainer = createReactClass({
    render: function () {
        return (
            <Map className="w-100 h-100" state={{
                center: [this.props.latitude, this.props.longitude],
                zoom: 12,
            }}>
                {
                    this.props.placemarks.map(value => <Placemark geometry={[value.latitude, value.longitude]} properties={{ balloonContentHeader: value.name }}
                        options={{ iconColor: 'red' }} modules={['geoObject.addon.balloon']}
                        key={value.id} />)
                }
            </Map>
        )
    }
})

function mapStateToProps(state) {
    return {
        latitude: state.mapSection.location.latitude,
        longitude: state.mapSection.location.longitude,
        placemarks: state.mapSection.placemarks,
        move: state.mapSection.user.move
    }
}

const MapContainer = connect(mapStateToProps, {})(innerMapContainer);

export default MapContainer;