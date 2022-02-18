import '../../App.css';
import MainPage from '../MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';

import Login from '../Login';
import Register from '../Register';
import { setPosition } from '../../store/mapReducer';

var innerAppContainer = createReactClass({
  componentDidMount: function () {
    navigator.geolocation.getCurrentPosition(this.props.setPosition);
  },
  render: function () {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
});

function mapStateToProps(state) {
  return {};
}

const AppContainer = connect(mapStateToProps, { setPosition })(innerAppContainer);

export default AppContainer;
