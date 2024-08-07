import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../../utils/Colors';
import useTimeout from '../../hooks/useTimeout';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {normalizeMS} from '../../utils/MathUtils';
import {AVATARS} from '../../assets/values/avatars';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useModalContext} from '../../context/ModalProvider';
import UserProfileModal from '../userProfileModal/UserProfileModal';

const RankPointTimeListItem = ({item, index, isMe}) => {
  const timeout = useTimeout();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {closeModal, setModalInfo} = useModalContext();

  const insetsBottom = insets.bottom > 0 ? insets.bottom : 26;
  const hasMinutes = Math.floor(item?.milliseconds / 60000) >= 1;
  const hasSeconds =
    !hasMinutes || Math.floor(item?.milliseconds / 1000) % 60 !== 0;

  const avatar =
    typeof item?.user?.[0]?.avatar === 'number'
      ? AVATARS[item?.user?.[0]?.avatar]
      : images.guest;

  //** ----- STYLES -----
  const containerStyles = [
    styles.container,
    styles.rowCenter,
    isMe && styles.myBG,
  ];

  //** ----- FUNCTIONS -----
  const onPress = React.useCallback(() => {
    setModalInfo({
      height: DimensionsUtils.getDP(224) + insetsBottom,
      content: (
        <UserProfileModal
          isMe={isMe}
          item={item}
          onViewProfilePress={onViewProfilePress}
        />
      ),
    });
  }, [item, isMe, insetsBottom, setModalInfo, onViewProfilePress]);

  const onViewProfilePress = React.useCallback(() => {
    closeModal();

    timeout.current = setTimeout(() => {
      if (isMe) {
        navigation.navigate('MyProfile');
      } else {
        navigation.navigate('Profile', {item});
      }
    }, 200);
  }, [isMe, item, closeModal, timeout, navigation]);

  return (
    <Pressable onPress={onPress} style={containerStyles}>
      <View style={styles.rowCenter}>
        <Text style={styles.index}>{index + 1}</Text>
        <FastImage
          source={avatar}
          style={styles.avatar}
          defaultSource={images.guest}
        />
      </View>
      <Text style={styles.textWrapper}>
        <Text style={styles.textGreenBold}>{`${item?.points} `}</Text>
        <Text style={styles.textGreyReg}>{dict?.pointsLabel}</Text>
      </Text>
      <Text style={styles.textWrapper}>
        <Text style={styles.textGreyReg}>{dict?.rankFlipListLabel1}</Text>
        {hasMinutes && (
          <>
            <Text style={styles.textGreenBold}>
              {Math.floor(item?.milliseconds / 60000)}
            </Text>
            <Text style={styles.textGreyReg}>{'m '}</Text>
          </>
        )}
        {hasSeconds && !hasMinutes && (
          <>
            <Text style={styles.textGreenBold}>
              {Math.floor(item?.milliseconds / 1000)}
            </Text>
            <Text style={styles.textGreyReg}>{'s '}</Text>
          </>
        )}
        {hasSeconds && hasMinutes && (
          <>
            <Text style={styles.textGreenBold}>
              {Math.floor(item?.milliseconds / 1000) % 60}
            </Text>
            <Text style={styles.textGreyReg}>{'s '}</Text>
          </>
        )}
        <Text style={styles.textGreenBold}>
          {normalizeMS(item?.milliseconds)}
        </Text>
        <Text style={styles.textGreyReg}>{dict?.rankFlipListLabel3}</Text>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: DimensionsUtils.getDP(12),
    paddingHorizontal: DimensionsUtils.getDP(16),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  index: {
    width: DimensionsUtils.getDP(36),
    color: Colors.appGreen,
    fontSize: DimensionsUtils.getFontSize(14),
    fontFamily: 'Poppins-Bold',
  },
  avatar: {
    marginLeft: DimensionsUtils.getDP(18),
    borderRadius: DimensionsUtils.getDP(18),
    width: DimensionsUtils.getDP(32),
    height: DimensionsUtils.getDP(32),
  },
  textWrapper: {
    fontSize: DimensionsUtils.getFontSize(16),
  },
  textGreenBold: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Bold',
  },
  textGreyReg: {
    color: Colors.tabBarIcon,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(14),
  },
  myBG: {
    backgroundColor: Colors.tabBarBg,
  },
});

export default RankPointTimeListItem;
