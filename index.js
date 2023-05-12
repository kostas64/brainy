import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId:
    '687899979713-d4v8o9ab6ckto7nbnvicpfuhe3qbakfk.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

AppRegistry.registerComponent(appName, () => App);
