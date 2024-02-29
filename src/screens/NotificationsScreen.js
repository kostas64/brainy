import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import {useStorage} from '../hooks/useStorage';
import Screen from '../components/common/Screen';
import {updateNotifSetts} from '../services/user';
import {DimensionsUtils} from '../utils/DimensionUtils';
import CustomSwitch from '../components/common/CustomSwitch';

const NotificationItem = ({value, setValue, title, caption}) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemSubtitle}>{caption}</Text>
      </View>
      <View style={styles.spaceTop}>
        <CustomSwitch value={value} setValue={setValue} />
      </View>
    </View>
  );
};

const NotificationsScreen = () => {
  const firstRender = React.useRef(0);

  const [settings, setSettings] = useStorage('notifSets', {
    score: true,
    friendReq: true,
    reminder: true,
  });

  React.useEffect(() => {
    if (firstRender.current !== 0) {
      updateNotifSetts(settings);
    }

    firstRender.current += 1;
  }, [settings]);

  return (
    <Screen noIcon label={dict.profileNotifications}>
      <View style={styles.container}>
        <NotificationItem
          value={settings.score}
          setValue={() =>
            setSettings(old => ({
              ...old,
              score: !old.score,
            }))
          }
          title={dict.notifyScoreTitle}
          caption={dict.notifyScoreSub}
        />
        <NotificationItem
          value={settings.friendReq}
          setValue={() =>
            setSettings(old => ({
              ...old,
              friendReq: !old.friendReq,
            }))
          }
          title={dict.notifyFriendReqTitle}
          caption={dict.notifyFriendReqSub}
        />
        <NotificationItem
          value={settings.reminder}
          setValue={() =>
            setSettings(old => ({
              ...old,
              reminder: !old.reminder,
            }))
          }
          title={dict.notifyReminderTitle}
          caption={dict.notifyReminderSub}
        />
      </View>
    </Screen>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimensionsUtils.getDP(32),
  },
  itemTitle: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(20),
  },
  itemSubtitle: {
    width: 270,
    color: Colors.halfWhite,
    marginTop: DimensionsUtils.getDP(4),
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(14),
  },
  spaceTop: {
    marginLeft: DimensionsUtils.getDP(8),
  },
});
