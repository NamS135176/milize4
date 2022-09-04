import {call, put, take, takeLatest} from 'redux-saga/effects';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_COMPANIES} from '~/actions/action_types';

import {getCompanies} from '~/services/companyService';

function* getCompaniesList(action: IActionGetCompany) {
  try {
    const listCompanies: Array<ICompanyInfo> = yield call(getCompanies);
    yield put({type: getActionSuccess(action.type), payload: listCompanies});
  } catch (error) {
    yield put({type: getActionFailed(action.type), payload: error.message});
  }
}

function* companiesSaga() {
  yield takeLatest(GET_COMPANIES, getCompaniesList);
}

export default companiesSaga;
