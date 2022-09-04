import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import codePush, {CodePushOptions} from 'react-native-code-push';
import {
  CODE_PUSH,
  ANDROID_CODE_PUSH_KEY,
  IOS_CODE_PUSH_KEY,
} from 'react-native-dotenv';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore, Persistor} from 'redux-persist';
import store from '~/store';
import NavigationComponent from '~/components/NavigationComponent';
const persistor: Persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <NavigationComponent></NavigationComponent>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}

let MyApp = App;
console.log('App...', {CODE_PUSH, IOS_CODE_PUSH_KEY, ANDROID_CODE_PUSH_KEY});
if (!__DEV__ && CODE_PUSH === 'true') {
  let codePushOptions: CodePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.IMMEDIATE,
    deploymentKey: Platform.select({
      ios: IOS_CODE_PUSH_KEY,
      android: ANDROID_CODE_PUSH_KEY,
    }),
    updateDialog: {
      mandatoryContinueButtonLabel: '更新する', //Update
      title: '更新版があります', //Update available
      mandatoryUpdateMessage:
        '更新版がありましたので、インストールしてください。', //An update is available that must be installed
    },
  };
  MyApp = codePush(codePushOptions)(App);
}
export default MyApp;
