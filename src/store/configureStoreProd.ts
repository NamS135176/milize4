import {createStore, applyMiddleware, compose, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '~/sagas';
import persistedReducer from './configurePersist';

const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
