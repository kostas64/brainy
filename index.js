import 'react-native-gesture-handler';
import Config from 'react-native-config';
import {AppRegistry, LogBox} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import App from './App';
import {name as appName} from './app.json';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const storage = new MMKVLoader().initialize();

AppRegistry.registerComponent(appName, () => App);
