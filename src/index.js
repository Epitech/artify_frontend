import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './context/StateProvider';

ReactDOM.render(
    <StateProvider>
        <App />
    </StateProvider>,
    document.getElementById('root'),
);

serviceWorker.register();
