import * as ActionTypes from '~/actions/action_types';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_INFO} from '~/actions/action_types';

const userInitialState: IUserInfoState = {
  loading: false,
  userInfo: {
    activated: true,
    birth: '',
    email: '',
    id: 0,
    name: '',
  },
  error: '',
};

function user(state = userInitialState, action: any) {
  switch (action.type) {
    case getActionSuccess(GET_INFO): {
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    }
    case getActionFailed(GET_INFO): {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_INFO: {
      return {
        ...state,
        loading: true,
      };
    }
    case 'CLEAR_USER':{
      return userInitialState
    }
    default:
      return state;
  }
}

export default user;
