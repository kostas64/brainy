import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Colors} from '../utils/Colors';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import MenuItem from '../components/common/MenuItem';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {useToastContext} from '../context/ToastProvider';

const AccountScreen = ({navigation}) => {
  const {setToast} = useToastContext();

  const onPressItem = (screen, params) => {
    navigation.navigate(screen, params);
  };

  return (
    <Screen label={dict.profileAccount} noIcon>
      <View style={styles.spaceHor}>
        <MenuItem
          withChevron
          icon={images.edit}
          label={dict.editAccount}
          isFirst={true}
          iconStyle={styles.icon}
          onPress={() => onPressItem('EditAccount')}
          isLast={false}
        />
        <MenuItem
          withChevron
          icon={images.profile}
          label={dict.pickAvatar}
          isFirst={false}
          iconStyle={styles.icon}
          onPress={() =>
            onPressItem('PickAvatar', {
              onUpdate: () => {
                navigation.pop();
                setToast({icon: images.logo, message: dict.avatarUpdated});
              },
            })
          }
          isLast={true}
        />
      </View>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  spaceHor: {
    marginTop: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(14),
    marginHorizontal: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarBg,
  },
  icon: {
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(22),
    height: DimensionsUtils.getDP(22),
    marginRight: DimensionsUtils.getDP(8),
  },
});
