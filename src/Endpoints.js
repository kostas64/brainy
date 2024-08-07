import Config from 'react-native-config';

export const HOST = Config.HOST;
export const BEARER = 'Bearer ';

//User services
export const REQUEST_ACCESS = '/users/requestAccess';
export const LOGOUT_USER = '/users/logout';
export const UPDATE_PROFILE = '/users/update-profile';
export const MY_PROFILE = '/users/me';
export const SEARCH_USER = '/users/search';
export const NOTIF_SETTINGS = '/users/notification-settings';
export const NOTIF_TOKEN = '/users/save-notification-token';
export const DELETE_ACCOUNT = '/users/delete-account';

//Game services
export const SCORE = '/score';
export const MATCH_CARDS = '/matchCards';
export const COLOR_CARDS = '/colorCards';
export const EQUAL_MATH = '/equalMath';
export const GESTURE_IT = '/gestureIt';
export const BALL_BALANCE = '/ballBalance';
export const BEST_OF = '/bestOf';
export const BEST_OF_USER = '/bestOfUser';

//Friends services
export const FRIENDSHIP = '/friends/hasFriendship';
export const LIST_FRIENDS = '/friends/list-friends';
export const FRIENDS_REQUEST = '/friends/request';
export const CHECK_FRIENDS_REQUEST = '/friends/check-request';
export const CHECK_ALL_FRIENDS_REQUESTS = '/friends/check-all-request';
export const CANCEL_FRIENDS_REQUEST = '/friends/cancel-request';
export const ACCEPT_FRIENDS_REQUEST = '/friends/accept-request';
export const DELETE_FRIEND = '/friends/delete-friend';

//Idea
export const SHARE_IDEA = '/idea/inspiration';
