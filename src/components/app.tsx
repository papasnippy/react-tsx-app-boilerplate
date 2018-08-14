import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
const Style = require('./app.scss');

export class App extends React.Component {
    public render() {
        return (
            <div className={Style.app}>
                <div>
                    <div>
                        React app bolierplate.
                    </div>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/page1">Page 1</Link>
                        <Link to="/page2">Page 2</Link>
                        <Link to="/page3">Page 3</Link>
                    </div>
                </div>
                <div>
                    <Switch>
                        <Route exact path="/" render={() => (
                            <div>Home</div>
                        )} />
                        <Route exact path="/page1" render={() => (
                            <div>Page 1</div>
                        )} />
                        <Route exact path="/page2" render={() => (
                            <div>Page 2</div>
                        )} />
                        <Route exact path="/page3" render={() => (
                            <div>Page 3</div>
                        )} />
                        <Route render={() => (
                            <div>404 page</div>
                        )} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
