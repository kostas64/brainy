import notifee, {AuthorizationStatus} from '@notifee/react-native';

export const requestNotPermissions = async () => {
  await notifee.requestPermission();
};

export const hasNotPermissions = async () => {
  const settings = await notifee.getNotificationSettings();

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    return true;
  } else if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
    return false;
  }
};
