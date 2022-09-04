import {call, put, take, takeLatest} from 'redux-saga/effects';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_NOTICES} from '~/actions/action_types';

import {getNotices} from '~/services/noticeService';

function* getNoticesList(action: IActionGetPolicy) {
  try {
    const listNotices: Array<INoticeInfo> = yield call(getNotices);
    yield put({type: getActionSuccess(action.type), payload: listNotices});
  } catch (error) {
    yield put({type: getActionFailed(action.type), payload: error.message});
  }
}

function* noticesSaga() {
  yield takeLatest(GET_NOTICES, getNoticesList);
}

export default noticesSaga;
