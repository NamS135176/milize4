import {call, put, take, takeLatest} from 'redux-saga/effects';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_POLICIES} from '~/actions/action_types';

import {getPolicies, checkListPolicy} from '~/services/policyService';

function* getPoliciesList(action: IActionGetPolicy) {
  try {
    const policiesData: IPolicyResData = yield call(getPolicies, action.sort);
    yield put({
      type: getActionSuccess(action.type),
      payload: {
        policiesData: policiesData,
        isShowModal: checkListPolicy(
          action.payload.oldList,
          policiesData.insurance_policies,
        ),
      },
    });
  } catch (error) {
    yield put({type: getActionFailed(action.type), payload: error.message});
  }
}

function* policiesSaga() {
  yield takeLatest(GET_POLICIES, getPoliciesList);
}

export default policiesSaga;
