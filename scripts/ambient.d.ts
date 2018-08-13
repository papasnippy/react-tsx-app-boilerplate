declare module 'reselect-tools' {
    import { createSelector, OutputSelector } from 'reselect';
    export function getStateWith(f: Function): void;
    export const createSelectorWithDependencies: typeof createSelector;
    export function registerSelectors(s: { [f: string]: OutputSelector }): void;
}
