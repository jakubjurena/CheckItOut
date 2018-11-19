import {
    applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import User from '../modules/User/reducers';

export default (history, initialState = {}) => {
    const enhancers = [];
    const { devToolsExtension } = window;
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
    return createStore(
        combineReducers({
            router: connectRouter(history),
            config: (state = {}) => state,
            form: formReducer,
            [User.id]: User.reducer,
        }),
        initialState,
        compose(
            applyMiddleware(
                thunk,
                routerMiddleware(history),
            ),
            ...enhancers,
        ),
    );
};
