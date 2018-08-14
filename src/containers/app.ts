import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { App } from '~/components';

function mapStateToProps(_state: any) {
    return {
    };
}

function mapDispatchToProps(_dispatch: Function) {
    return {
    };
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(App));
