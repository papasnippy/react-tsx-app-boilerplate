import { connect } from 'react-redux';
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

export default connect<Partial<IAppProps>>(mapStateToProps, mapDispatchToProps)(App);

// import { withRouter } from 'react-router-dom';
// export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(App));
