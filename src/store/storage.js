import { createStore, combineReducers, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import mapReducer from './mapReducer';

let reducers = combineReducers({
    mapSection: mapReducer
});

let store = createStore(reducers, applyMiddleware(ThunkMiddleware));

export default store;