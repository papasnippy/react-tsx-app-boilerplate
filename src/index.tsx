import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from '~/components';
import configureStore from '~/store';

// Routing (todo)
// import { History } from 'history';
// const BASE_URL = process.env.BASE_URL; // needed for router

const store = configureStore();

const render = () => {
    const root = document.getElementsByTagName('app-root')[0];

    if (!root) {
        throw new Error(`Root element "app-root" not found.`);
    }

    ReactDOM.render((
        <Provider store={store}>
            <App />
        </Provider>
    ), root);
};

if (process.env.ENV === 'development' && module.hot) {
    module.hot.accept('~/components', render);
    module.hot.accept('~/containers', render);
}

render();
