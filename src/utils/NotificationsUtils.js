import notifee, {
  TimeUnit,
  EventType,
  TriggerType,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import {Platform, ToastAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {storage} from '../..';
import {isAndroid} from './GenericUtils';
import {acceptFriendsRequest, cancelFriendsRequest} from '../services/friends';

export class NotificationUtils {
  static backgroundNotification = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      if (remoteMessage?.data?.type === 'friend_request') {
        this.displayFriendRequestNotification(remoteMessage);
      }
    });
  };

  static foregroundNotification = () => {
    return notifee.onForegroundEvent(async ({type, detail}) => {
      console.log('foreground notification ', type, detail);
      const id = detail?.pressAction?.id;

      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          if (id === 'accept-request' || id === 'reject-request') {
            await notifee.cancelNotification(detail?.notification?.id);
          }
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          if (id === 'accept-request' || id === 'reject-request') {
            await notifee.cancelNotification(detail?.notification?.id);
          }
          break;
        case EventType.ACTION_PRESS:
          console.log('User pressed action notification', detail.notification);
          if (id === 'accept-request') {
            const {token, userId_request} = detail?.notification?.data;
            acceptFriendsRequest(userId_request, token);
            await notifee.cancelNotification(detail?.notification?.id);
          } else if (id === 'reject-request') {
            const {token, userId_request} = detail?.notification?.data;
            cancelFriendsRequest(userId_request, token);
            await notifee.cancelNotification(detail?.notification?.id);
          }

          break;
      }
    });
  };

  static onBackgroundEvent = () => {
    return notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('background notification ', Platform.OS, type, detail);
      const id = detail?.pressAction?.id;

      switch (type) {
        case EventType.DISMISSED:
          console.log('Notification dismissed ');
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          //await notifee.cancelNotification(detail?.notification?.id);
          break;
        case EventType.ACTION_PRESS:
          console.log('User pressed action notification', detail);
          if (id === 'accept-request') {
            const {token, userId_request} = detail?.notification?.data;
            acceptFriendsRequest(userId_request, token).then(() => {
              ToastAndroid.showWithGravity(
                'Friend request accepted',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            });
            await notifee.cancelNotification(detail?.notification?.id);
          } else if (id === 'reject-request') {
            const {token, userId_request} = detail?.notification?.data;
            cancelFriendsRequest(userId_request, token).then(() => {
              ToastAndroid.showWithGravity(
                'Friend request rejected',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
            });
            await notifee.cancelNotification(detail?.notification?.id);
          }

          break;
        case EventType.DELIVERED:
          console.log('Notification delivered');
          break;
        case EventType.TRIGGER_NOTIFICATION_CREATED:
          console.log('Trigger notification created');
          break;
      }
    });
  };

  static onMessage = async () => {
    messaging().onMessage(message => {
      console.log('Message ', Platform.OS, message?.data, message?.data?.type);

      if (message?.data?.type === 'friend_request') {
        this.displayFriendRequestNotification(message);
      } else {
        this.displayNotification(message);
      }
    });
  };

  static triggerReminderNotification = () => {
    this.displayNotification({
      notification: {
        title: 'Reminder',
        body: 'Your brain needs you! Play now ⚔️',
      },
    });
  };

  static displayNotification = async data => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    let payload = {
      title: data?.notification?.title,
      body: data?.notification?.body,
      android: {
        channelId,
        color: '#8ada4d',
        smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    };

    if (data?.data) {
      payload = {
        ...payload,
        ...data,
      };
    }

    // Display a notification
    await notifee.displayNotification(payload);
  };

  static displayFriendRequestNotification = async data => {
    //console.log('Parsed ', data);

    const channelId = await notifee.createChannel({
      id: data?.messageId || 'default',
      name: 'Friend requests',
    });

    // Display a notification
    await notifee.displayNotification({
      title: data?.data?.body,
      data: {
        token: data?.data?.token,
        userId_request: data?.data?.userId_request,
      },
      android: {
        channelId,
        actions: JSON.parse(data?.data?.actions),
        color: '#8ada4d',
        smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  static createReminderNotification = async () => {
    const settings = storage.getArray('notifSets');
    const {trigger, payload} = this.getReminderPayload();

    if (settings?.reminder || settings?.reminder === undefined) {
      console.log('Creating reminder notification');

      if (isAndroid) {
        await notifee.createChannel({
          id: 'reminder-channel',
          name: 'Reminder',
          vibration: true,
          importance: AndroidImportance.HIGH,
          visibility: AndroidVisibility.PUBLIC,
        });
      }

      await notifee.createTriggerNotification(payload, trigger);
    } else {
      return null;
    }
  };

  static getReminderPayload = () => {
    const trigger = {
      type: TriggerType.INTERVAL,
      interval: 1,
      timeUnit: TimeUnit.DAYS,
    };

    const payload = {
      id: 'reminder',
      title: 'Reminder',
      body: 'Your brain needs you! Play now ⚔️',
      android: {
        color: '#8ada4d',
        channelId: 'reminder-channel',
        smallIcon: 'ic_notification',
        pressAction: {
          id: 'default',
        },
      },
    };

    return {
      trigger,
      payload,
    };
  };
}
