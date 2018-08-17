import * as React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ConnectedRouter, push } from 'connected-react-router';

test('example', async () => {
    const { App } = await import('~/containers');
    const { default: createStore } = await import('~/store');
    const { store, history } = createStore();
    const jsx = (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    );

    let component = create(jsx);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot('home');

    store.dispatch(push('/page1'));
    component = create(jsx);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot('page1');

    store.dispatch(push('/page2'));
    component = create(jsx);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot('page2');

    store.dispatch(push('/page3'));
    component = create(jsx);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot('page3');

    store.dispatch(push('/404'));
    component = create(jsx);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot('404');
});
