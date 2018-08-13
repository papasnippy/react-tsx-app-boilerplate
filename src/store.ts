import { Store, applyMiddleware, compose, createStore } from 'redux';
import Thunk from 'redux-thunk';
import rootReducer from '~/reducers';

export default function() {
    let store: Store = null;
    let middlewares = applyMiddleware(
        Thunk.withExtraArgument({})
        // ... other middlewares
    );

    if (process.env.ENV === 'development') {
        const w = window as any;
        const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = createStore(rootReducer, composeEnhancers(middlewares));

        // Reselect dev tools setup
        const ReselectTools = require('reselect-tools');
        ReselectTools.getStateWith(() => store.getState());

        if (module.hot) {
            module.hot.accept('~/reducers', () => {
                const next = require('~/reducers');
                console.log({ next });
                store.replaceReducer(next.default);
            });
        }
    } else {
        store = createStore(rootReducer, middlewares);
    }

    return store;
}
