import * as React from 'react';
const Style = require('./app.scss');

export class App extends React.Component {
    public render() {
        return (
            <div className={Style.app}>
                React app bolierplate.
            </div>
        );
    }
}

export default App;
