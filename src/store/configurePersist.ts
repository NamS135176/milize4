import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, createTransform} from 'redux-persist';
import rootReducer from '../reducers';

import omit from 'lodash/omit';

const blacklistPaths = ['user.error', 'user.loading'];
let blacklistTransform = createTransform((inboundState, key) => {
  const blacklistPaths_forKey = blacklistPaths
    //@ts-ignore
    .filter(path => path.startsWith(`${key}.`))
    //@ts-ignore
    .map(path => path.substr(key.length + 1));
  //@ts-ignore
  return omit(inboundState, ...blacklistPaths_forKey);
}, null);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  transforms: [blacklistTransform],
};

export default persistReducer(persistConfig, rootReducer);
