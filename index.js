import 'react-native-gesture-handler';

import App from './App';
import Config from 'react-native-config';
import {name as appName} from './app.json';
import {AppRegistry, LogBox} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

AppRegistry.registerComponent(appName, () => App);
