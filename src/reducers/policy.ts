import * as ActionTypes from '~/actions/action_types';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_POLICIES} from '~/actions/action_types';

const policyState: IPolicyState = {
  loading: true,
  policiesData: {
    annual_premium_sum: '',
    annual_premium_sum_unit: '',
    insurance_policies: [],
  },
  isShowModal: false,
  error: '',
};

function policy(state = policyState, action: any) {
  // action.payload
  switch (action.type) {
    case getActionSuccess(GET_POLICIES): {
      return {
        ...state,
        loading: false,
        policiesData: action.payload.policiesData,
        isShowModal: action.payload.isShowModal,
      };
    }
    case getActionFailed(GET_POLICIES): {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_POLICIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case 'UPDATE_LOADING_MODAL': {
      return {
        ...state,
        isShowModal: action.payload,
      };
    }
    case 'CLEAR_DATA': {
      return policyState
    }
    case 'REVERSE': {
      return {
        ...state,
        policiesData: {
          ...state.policiesData,
          insurance_policies: state.policiesData.insurance_policies.reverse(),
        },
      };
    }
    default:
      return state;
  }
}

export default policy;
