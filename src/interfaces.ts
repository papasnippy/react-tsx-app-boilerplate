import { RouterState } from 'connected-react-router';

namespace App {
    export interface State {
        router: RouterState;

        placeholder: {
            message: string;
        };
    }
}

export default App;

