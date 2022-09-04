import {combineReducers} from 'redux';
import user from './user';
import company from './company';
import policy from './policy';
import notice from './notice';
import share from './share';
export default combineReducers({
  user: user,
  company: company,
  policy: policy,
  notice: notice,
  share: share,
});
