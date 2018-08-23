import * as React from 'react';
import * as Style from './logo.scss';

export class Logo extends React.PureComponent {
    public render() {
        return (
            <div className={Style.logo}>
                <div className={Style.ring} />
                <div className={Style.ring} />
                <div className={Style.ring} />
                <div className={Style.dot} />
            </div>
        );
    }
}

export default Logo;

