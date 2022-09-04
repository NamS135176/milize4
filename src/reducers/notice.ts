import * as ActionTypes from '~/actions/action_types';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_NOTICES} from '~/actions/action_types';

const noticeState: INoticeState = {
  loading: true,
  listNotices: [],
  error: '',
};

function notice(state = noticeState, action: any) {
  // action.payload
  switch (action.type) {
    case getActionSuccess(GET_NOTICES): {
      return {
        ...state,
        loading: false,
        listNotices: action.payload,
      };
    }
    case getActionFailed(GET_NOTICES): {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_NOTICES: {
      return {
        ...state,
        loading: true,
      };
    }
    case 'CLEAR_NOTICE' : {
      return noticeState
    }
    default:
      return state;
  }
}

export default notice;
