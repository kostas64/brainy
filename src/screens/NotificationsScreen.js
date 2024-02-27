import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import {DimensionsUtils} from '../utils/DimensionUtils';
import CustomSwitch from '../components/common/CustomSwitch';

const NotificationItem = ({title, caption}) => {
  const [value, setValue] = React.useState(true);

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
  return (
    <Screen noIcon label={dict.profileNotifications}>
      <View style={styles.container}>
        <NotificationItem
          title={dict.notifyScoreTitle}
          caption={dict.notifyScoreSub}
        />
        <NotificationItem
          title={dict.notifyFriendReqTitle}
          caption={dict.notifyFriendReqSub}
        />
        <NotificationItem
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
    opacity: 0.5,
    color: Colors.white,
    marginTop: DimensionsUtils.getDP(4),
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(14),
    width: 270,
  },
  spaceTop: {
    marginLeft: DimensionsUtils.getDP(8),
  },
});
