import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './config/routes';

const history = browserHistory;

ReactDOM.render(<Router history={ history }>{routes}</Router>, document.getElementById('app'));
