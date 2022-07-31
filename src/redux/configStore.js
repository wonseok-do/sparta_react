import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import bucket from "./modules/bucket";
import thunk from "redux-thunk";

const middlewares = [thunk];
const rootReducer = combineReducers({ bucket });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
