import {all} from 'redux-saga/effects';
import userSagas from './user';
import companiesSaga from './companies';
import policiesSaga from './policies';
import noticesSaga from './notices';
import shareSaga from './share';
export default function* rootSagas() {
  yield all([userSagas(), companiesSaga(), policiesSaga(), noticesSaga(),shareSaga()]);
}
