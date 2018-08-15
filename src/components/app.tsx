import * as React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
const Style = require('./app.scss');

import Logo from './logo';

export interface IAppProps {
    pathname: string;
}

export class App extends React.Component<IAppProps> {
    public render() {
        return (
            <>
                <div className={Style.topbar}>
                    <div className={Style.logoContainer}>
                        <Logo />
                    </div>
                    <div>
                        <div className={Style.title}>
                            <h2>React app bolierplate</h2>
                        </div>
                        <nav>
                            <NavLink activeClassName={Style.link} exact to="/">Home</NavLink>
                            <NavLink activeClassName={Style.link} to="/page1">Page 1</NavLink>
                            <NavLink activeClassName={Style.link} to="/page2">Page 2</NavLink>
                            <NavLink activeClassName={Style.link} to="/page3">Page 3</NavLink>
                        </nav>
                    </div>
                </div>
                <div className={Style.content}>
                    <div>
                        Path: {this.props.pathname}
                    </div>
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
            </>
        );
    }
}

export default App;
