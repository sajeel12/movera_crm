import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/combineReducer'; // Replace with your root reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
