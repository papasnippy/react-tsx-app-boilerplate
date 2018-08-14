import { combineReducers } from 'redux';
import Type from '~/interfaces';

export default combineReducers<Type.State>({
    router: null,
    placeholder: () => ({ message: 'remove me with normal reducers' })
});
