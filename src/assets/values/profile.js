import images from '../images/images';
import dict from '../values/dict.json';

export const PROFILE_SECTIONS = [
  {
    title: dict.profileAccount,
    screen: 'Account',
    icon: images.profile,
  },
  {
    title: dict.profileFriends,
    screen: 'FriendsTabs',
    icon: images.friends,
  },
  {
    title: dict.profileNotifications,
    screen: 'Notifications',
    icon: images.notification,
  },
  {
    title: dict.profileInvite,
    screen: 'InviteFriend',
    icon: images.envelope,
  },
  {
    title: dict.profileLogout,
    icon: images.logout,
  },
];
