import '~/index.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { App } from '~/containers';
import configureStore from '~/store';

const { store, history } = configureStore();

const render = () => {
    const root = document.getElementsByTagName('app-root')[0];

    if (!root) {
        throw new Error(`Root element "app-root" not found.`);
    }

    ReactDOM.render((
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    ), root);
};

if (process.env.ENV === 'development' && module.hot) {
    module.hot.accept('~/components', render);
    module.hot.accept('~/containers', render);
}

render();
