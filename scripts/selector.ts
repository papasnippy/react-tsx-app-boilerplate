/// <reference path="ambient.d.ts"/>
import { createSelector as createSelectorOrig } from 'reselect';
import { createSelectorWithDependencies } from 'reselect-tools';
export { registerSelectors } from 'reselect-tools';

let _createSelector = createSelectorOrig;

if (process.env.TARGET !== 'produciton') {
    _createSelector = createSelectorWithDependencies;
}

export const createSelector = _createSelector;
export const create = createSelector;

export function register<T = typeof createSelector>(name: string, selector: T): T {
    if (process.env.TARGET !== 'production') {
        selector['selectorName'] = name;
    }

    return selector;
}


