import createReactClass from "create-react-class";
import { connect } from "react-redux";
import $ from 'jquery';
import LeftMenu from "../LeftMenu";

var innerLeftMenuContainer = createReactClass({
    render: function () {
        $('#loading').addClass('d-none');
        return (
            <LeftMenu {...this.props} />
        )
    }
});

function mapStateToProps(state) {
    return {
        placemarks: state.mapSection.placemarks
    }
}

const LeftMenuContainer = connect(mapStateToProps, {})(innerLeftMenuContainer);

export default LeftMenuContainer;