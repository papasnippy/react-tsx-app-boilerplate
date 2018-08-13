import * as Reselect from 'reselect';
let _createSelector = Reselect.createSelector;

if (process.env.TARGET === 'development') {
    const ReselectTools = require('reselect-tools');
    _createSelector = ReselectTools.createSelectorWithDependencies;
}

export const createSelector = _createSelector;

export function register<T = typeof createSelector>(name: string, selector: T): T {
    if (process.env.TARGET === 'development') {
        (selector as any)['selectorName'] = name;
    }

    return selector;
}


/*
import Foo from './foo';
import Bar from './bar';

export {
    Foo,
    Bar
};
*/
