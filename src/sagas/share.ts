import {call, put, take, takeLatest} from 'redux-saga/effects';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_SHARE_RECEIVE} from '~/actions/action_types';

import {getReceive} from '~/services/shareService';

function* getShare(action: IActionGetShare) {
  try {
    const listReceive: Array<IShareReceiveInfo> = yield call(getReceive);
    const listReceiveFilter = listReceive.filter(item => {
      return item.status == 'waiting';
    });
    if (listReceiveFilter.length == 0) {
      yield put({
        type: getActionSuccess(action.type),
        payload: {
          listReceive: listReceiveFilter,
          isShow: false,
        },
      });
    } else {
      yield put({
        type: getActionSuccess(action.type),
        payload: {
          listReceive: listReceiveFilter,
          isShow: true,
        },
      });
    }
  } catch (error) {
    yield put({type: getActionFailed(action.type), payload: error.message});
  }
}

function* shareSaga() {
  yield takeLatest(GET_SHARE_RECEIVE, getShare);
}

export default shareSaga;
