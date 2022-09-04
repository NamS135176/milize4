import Reactotron, {networking} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const scriptURL = NativeModules.SourceCode.scriptURL;
let scriptHostname = scriptURL.split('://')[1].split(':')[0];
// First, set some configuration settings on how to connect to the app
Reactotron.setAsyncStorageHandler(AsyncStorage).configure({
  name: 'Miruho',
  host: scriptHostname,
  port: 9090,
});

// add every built-in react native feature.  you also have the ability to pass
// an object as a parameter to configure each individual react-native plugin
// if you'd like.
Reactotron.useReactNative({
  // asyncStorage: {ignore: ['secret']},
  asyncStorage: false, // there are more options to the async storage.
  networking: {
    // optionally, you can turn it off with false.
    ignoreUrls: /symbolicate/,
  },
  editor: false, // there are more options to editor
  errors: {veto: stackFrame => false}, // or turn it off with false
  overlay: false, // just turning off overlay
});

// add some more plugins for redux
Reactotron.use(reactotronRedux());
Reactotron.use(sagaPlugin());
Reactotron.use(
  networking({
    ignoreContentTypes: /^(image)\/.*$/i,
    ignoreUrls: /\/(logs|symbolicate)$/,
  }),
);

// if we're running in DEV mode, then let's connect!
if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron.tron;
// console.log = Reactotron.log;
const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};
console.error = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.ERROR',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};
// console.warn = Reactotron.warn;
console.group = Reactotron.group;
console.disableYellowBox = true;

export default Reactotron;
