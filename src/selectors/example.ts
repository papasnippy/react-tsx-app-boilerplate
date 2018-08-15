import { createSelector, register } from '~/reselect-utils';
import Type from '~/interfaces';

export const ExampleSelector = register('ExampleSelector', createSelector(
    (state: Type.State) => state.router.location.pathname,
    (pathname) => {
        return pathname;
    }
));

export default ExampleSelector;
