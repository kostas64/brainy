import App from './App';
import Config from 'react-native-config';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

AppRegistry.registerComponent(appName, () => App);
