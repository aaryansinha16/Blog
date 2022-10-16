import { authReducer } from "./auth/auth.reducer";
import {applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux'
import thunk from 'redux-thunk'

const rootReducers = combineReducers({
    auth: authReducer
})

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

export const store = legacy_createStore(rootReducers, createComposer(applyMiddleware(thunk)))