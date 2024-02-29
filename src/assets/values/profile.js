import images from '../images/images';
import dict from '../values/dict.json';

export const PROFILE_SECTIONS = [
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

export const PROFILE_SECTIONS_2 = [
  {
    title: dict.profileInvite,
    screen: dict.profileInvite,
    icon: images.envelope,
  },
  {
    title: dict.profileInspiration,
    screen: 'LeaveFeedback',
    icon: images.creative,
  },
];

export const PROFILE_SECTIONS_3 = {
  title: dict.profileLogout,
  icon: images.logout,
};
