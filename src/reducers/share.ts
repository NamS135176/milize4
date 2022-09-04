import * as ActionTypes from '~/actions/action_types';
import {getActionSuccess, getActionFailed} from '~/actions';
import {GET_SHARE_RECEIVE} from '~/actions/action_types';

const shareReceiveState: IShareReceiveState = {
  loading: false,
  listReceive: [],
  isShow: false,
  error: '',
};

function share(state = shareReceiveState, action: any) {
  // action.payload
  switch (action.type) {
    case getActionSuccess(GET_SHARE_RECEIVE): {
      return {
        ...state,
        loading: false,
        listReceive: action.payload.listReceive,
        isShow: action.payload.isShow,
      };
    }
    case getActionFailed(GET_SHARE_RECEIVE): {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_SHARE_RECEIVE: {
      return {
        ...state,
        loading: true,
        isShow:false
      };
    }
    case 'CLOSE_ACCEPT_MODAL':{
      return {
        ...state,
        isShow:false
      };
    }
    case 'CLEAR_SHARE': {
      return shareReceiveState
    }
    default:
      return state;
  }
}

export default share;
