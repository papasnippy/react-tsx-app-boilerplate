import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import Type from '~/interfaces';

export default (history: History) => combineReducers<Type.State>({
    router: connectRouter(history),
    placeholder: () => 'replace me with normal reducers'
});
