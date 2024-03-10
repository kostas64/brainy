import React from 'react';
import {Text, View, Linking, StyleSheet} from 'react-native';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import notifee, {AndroidNotificationSetting} from '@notifee/react-native';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import {useStorage} from '../hooks/useStorage';
import Screen from '../components/common/Screen';
import {useAppState} from '../hooks/useAppState';
import {updateNotifSetts} from '../services/user';
import {animateInput} from '../utils/AnimateUtils';
import InfoBox from '../components/common/InfoBox';
import {useInteraction} from '../hooks/useInteraction';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {hasNotPermissions} from '../utils/PermissionUtils';
import CustomSwitch from '../components/common/CustomSwitch';
import {NotificationUtils} from '../utils/NotificationsUtils';
import {isAndroid, isTiramisuAndHigher} from '../utils/GenericUtils';

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
  const translateX = useSharedValue(0);

  const firstRender = React.useRef(0);
  const [showBox, setShowBox] = React.useState(false);
  const [boxLabel, setBoxLabel] = React.useState(null);

  const [settings, setSettings] = useStorage('notifSets', {
    score: true,
    friendReq: true,
    reminder: true,
  });

  const isSwitchDisabled = boxLabel === dict.infoAlarmLabel && isAndroid;

  //** ----- STYLES -----
  const animStyle = useAnimatedStyle(
    () => ({transform: [{translateX: translateX.value}]}),
    [],
  );

  //** ----- FUNCTIONS -----
  const onPressInfoBox = async () => {
    if (boxLabel === dict.infoAlarmLabel) {
      await notifee.openAlarmPermissionSettings();
    } else {
      Linking.openSettings();
    }
  };

  const handleReminderNotification = React.useCallback(value => {
    notifee.getTriggerNotificationIds().then(async ids => {
      const idToDelete = ids.find(id => id === 'reminder');

      if (!value && idToDelete) {
        await notifee.cancelTriggerNotification(idToDelete);
      } else if (value) {
        const {trigger, payload} = NotificationUtils.getReminderPayload();
        await notifee.createTriggerNotification(payload, trigger);
      }
    });
  }, []);

  const onToggleReminder = () => {
    if (isSwitchDisabled) {
      animateInput(translateX);
    } else {
      let value;

      setSettings(old => {
        value = !old.reminder;
        return {...old, reminder: !old.reminder};
      });

      handleReminderNotification(value);
    }
  };

  const checkForPerms = React.useCallback(async () => {
    if (isAndroid) {
      const alarm = await notifee.getNotificationSettings();

      if (
        isTiramisuAndHigher &&
        alarm.android.alarm !== AndroidNotificationSetting.ENABLED
      ) {
        //Case is Android  >= Tiramisu && Alarm disabled
        setSettings(old => ({...old, reminder: false}));
        setBoxLabel(dict.infoAlarmLabel);
        !showBox && setShowBox(true);
      } else if (isTiramisuAndHigher) {
        //Case is Android >= Tiramisu && Alarm enabled
        showBox && setShowBox(false);
        setBoxLabel(null);
        setSettings(old => ({...old, reminder: true}));
      }
    } else {
      const res = await hasNotPermissions();
      setBoxLabel(dict.infoNotLabel);
      setShowBox(!res);
    }
  }, [showBox, setSettings]);

  //** ----- EFFECTS -----
  useAppState(checkForPerms, false);
  useInteraction(checkForPerms);

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
          title={dict.notifyScoreTitle}
          caption={dict.notifyScoreSub}
          setValue={() => setSettings(old => ({...old, score: !old.score}))}
        />
        <NotificationItem
          value={settings.friendReq}
          setValue={() =>
            setSettings(old => ({...old, friendReq: !old.friendReq}))
          }
          title={dict.notifyFriendReqTitle}
          caption={dict.notifyFriendReqSub}
        />
        <NotificationItem
          value={settings.reminder}
          setValue={onToggleReminder}
          title={dict.notifyReminderTitle}
          caption={dict.notifyReminderSub}
        />

        <InfoBox
          showBox={showBox}
          infoLabel={boxLabel}
          onPress={onPressInfoBox}
          callToActionLabel={dict.infoNotCtaLabel}
          containerStyle={[styles.infoBoxContainer, animStyle]}
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
  infoBoxContainer: {
    marginTop: DimensionsUtils.getDP(24),
  },
});
