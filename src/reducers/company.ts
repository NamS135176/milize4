import * as ActionTypes from '~/actions/action_types';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_COMPANIES} from '~/actions/action_types';

const companyState: ICompanyState = {
  loading: true,
  companyList: [],
  error: '',
};

function company(state = companyState, action: any) {
  // action.payload
  switch (action.type) {
    case getActionSuccess(GET_COMPANIES): {
      return {
        ...state,
        loading: false,
        companyList: action.payload,
      };
    }
    case getActionFailed(GET_COMPANIES): {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_COMPANIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case 'CLEAR_COM' : {
      return companyState
    }
    default:
      return state;
  }
}

export default company;
