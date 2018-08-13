/// <reference path="ambient.d.ts"/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, Middleware } from 'redux';
import { Provider } from 'react-redux';
// import { History } from 'history';

export interface ICreateProps {
    /** If used, redux library will be imported. */
    redux?: {
        /** Import and use reselect-tools library. */
        useReselect?: boolean;
        /** Import and use redux-thunk library. */
        useReduxThunk?: boolean;
        /** Array of additional middlewares. */
        middlewares?: Middleware[];
        /** Extra argument for redux-thunk. */
        thunkExtraArgument?: any;
    };
}

export async function createApp(props: ICreateProps = {}) {
    const baseUrl = process.env.BASE_URL;

    let store: Store = null;
    let ReduxProvider: typeof Provider = null;

    if (props.redux) {
        const { applyMiddleware, compose, createStore } = await import('redux');
        const { Provider: _p } = await import('react-redux');
        const { default: Reducer } = await import('~/reducers');
        const providedMiddlewares = props.redux.middlewares || [];

        ReduxProvider = _p;
        let middlewares: any = null;

        if (props.redux.useReduxThunk) {
            const { default: ReduxThunk } = await import('redux-thunk');
            middlewares = applyMiddleware(
                ReduxThunk.withExtraArgument(props.redux.thunkExtraArgument || null),
                ...providedMiddlewares
            );
        } else {
            middlewares = applyMiddleware(...providedMiddlewares);
        }

        if (process.env.ENV !== 'production') {
            const w = window as any;
            const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
            store = createStore(Reducer, composeEnhancers(middlewares));

            if (props.redux.useReselect) {
                const ReselectTools = await import('reselect-tools');
                ReselectTools.getStateWith(() => store.getState());
            }
        } else {
            store = createStore(Reducer, middlewares);
        }
    }

    return {
        baseUrl,
        store,
        render: (app: React.ReactElement<any>) => {
            const root = document.getElementsByTagName('app-root')[0];

            if (!root) {
                throw new Error(`Root element "app-root" not found.`);
            }

            if (ReduxProvider && store) {
                ReactDOM.render((
                    <ReduxProvider store={store}>
                        {app}
                    </ReduxProvider>
                ), root);
            }

            ReactDOM.render(app, root);
        }
    };
}
