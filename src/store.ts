import { createBrowserHistory } from 'history';
import { Store, applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
import createRootReducer from '~/reducers';
import Type from '~/interfaces';

export default function() {
    let store: Store<Type.State> = null;
    let history = createBrowserHistory({
        basename: process.env.BASE_URL
    });

    let middlewares = applyMiddleware(
        routerMiddleware(history),
        ReduxThunk.withExtraArgument({})
    );

    function createReducer() {
        return createRootReducer(history);
    }

    let reducer = createReducer();

    if (process.env.ENV === 'development') {
        const w = window as any;
        const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = createStore(reducer, composeEnhancers(middlewares));

        // Reselect dev tools setup
        const ReselectTools = require('reselect-tools');
        ReselectTools.getStateWith(() => store.getState());

        if (module.hot) {
            module.hot.accept('~/reducers', () => {
                store.replaceReducer(createReducer());
            });
        }
    } else {
        store = createStore(reducer, middlewares);
    }

    return { store, history };
}
