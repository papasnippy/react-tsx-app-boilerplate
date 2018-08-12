import * as React from 'react';
import * as ReactDOM from 'react-dom';
const Style = require('./index.scss');

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

const root = document.getElementsByTagName('app-root')[0];

if (!root) {
    throw new Error(`Root element "app-root" not found.`);
}

ReactDOM.render(<App/>, root);
