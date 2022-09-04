import {createStore, applyMiddleware, compose, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootSaga from '../sagas';
import persistedReducer from './configurePersist';
import Reactotron from '../../ReactotronConfig';

const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(sagaMiddleware, logger),
    //@ts-ignore
    Reactotron.createEnhancer(),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
