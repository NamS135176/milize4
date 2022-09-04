import {call, put, take, takeLatest} from 'redux-saga/effects';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_INFO} from '~/actions/action_types';

import {getUserInfoData} from '~/services/userService';

function* getUserInfo(action: IActionToken) {
  try {
    const userInfo: IUserInfoData = yield call(getUserInfoData, action);
    yield put({type: getActionSuccess(action.type), payload: userInfo});
  } catch (error) {
    yield put({type: getActionFailed(action.type), payload: error.message});
  }
}

function* userSagas() {
  yield takeLatest(GET_INFO, getUserInfo);
}

export default userSagas;
