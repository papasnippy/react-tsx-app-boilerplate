import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Types from '~/interfaces';
import { App, IAppProps } from '~/components/app';
import { ExampleSelector } from '~/selectors';

function mapStateToProps(state: Types.State): Partial<IAppProps> {
    return {
        pathname: ExampleSelector(state)
    };
}

function mapDispatchToProps(_dispatch: Function) {
    return {
    };
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(App));
