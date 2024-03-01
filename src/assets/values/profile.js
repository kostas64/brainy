import images from '../images/images';
import dict from '../values/dict.json';

export const FIRST_SECTION = [
  {
    title: dict.profileAccount,
    screen: 'Account',
    icon: images.profile,
  },
  {
    title: dict.profileNotifications,
    screen: 'Notifications',
    icon: images.notification,
  },
];

export const INSPIRE = {
  title: dict.profileInspiration,
  screen: 'LeaveFeedback',
  icon: images.creative,
};

export const LOGOUT = {
  title: dict.profileLogout,
  icon: images.logout,
};

export const INVITE = {
  title: dict.profileInvite,
  icon: images.envelope,
};
