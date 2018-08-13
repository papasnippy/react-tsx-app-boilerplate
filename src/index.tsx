import * as React from 'react';

const Style = require('./index.scss');
import { createApp } from ':';

if (module.hot) {
    module.hot.accept();
}

class App extends React.Component {
    public render() {
        return (
            <div className={Style.app}>
                React app bolierplate.
            </div>
        );
    }
}

createApp({
    redux: {
        useReduxThunk: true
    }
}).then(({ render }) => {
    render(<App/>);
});

