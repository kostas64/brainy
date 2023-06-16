import 'react-native-gesture-handler';

import App from './App';
import Config from 'react-native-config';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Bugsnag from '@bugsnag/react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

Bugsnag.start();

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

AppRegistry.registerComponent(appName, () => App);
