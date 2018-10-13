import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';

import AllReducers from '../reducers/Index';

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

const middleware = applyMiddleware(logger);

const store = createStore(
  AllReducers,
  compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
);

export default store;