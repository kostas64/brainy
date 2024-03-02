import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../../utils/Colors';
import useTimeout from '../../hooks/useTimeout';
import dict from '../../assets/values/dict.json';
import {normalizeMS} from '../../utils/MathUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useModalContext} from '../../context/ModalProvider';
import {matchGameWithScreenName} from '../../utils/GenericUtils';
import UserProfileModal from '../userProfileModal/UserProfileModal';

const RankFlipListItem = ({item, index, isMe}) => {
  const timeout = useTimeout();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {closeModal, setModalInfo} = useModalContext();

  const insetsBottom =
    insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(20);

  //** ----- STYLES -----
  const containerStyles = [
    styles.container,
    styles.rowCenter,
    isMe && styles.myBG,
  ];

  //** ----- FUNCTIONS -----
  const onPress = React.useCallback(() => {
    setModalInfo({
      height: 384 + insetsBottom,
      content: (
        <UserProfileModal
          isMe={isMe}
          item={item}
          onGamePress={onGamePress}
          onViewProfilePress={onViewProfilePress}
        />
      ),
    });
  }, [item, isMe, insetsBottom, setModalInfo, onGamePress, onViewProfilePress]);

  const onViewProfilePress = React.useCallback(() => {
    closeModal();

    timeout.current = setTimeout(() => {
      if (isMe) {
        navigation.navigate('MyProfile');
      } else {
        navigation.navigate('Profile');
      }
    }, 200);
  }, [isMe, closeModal, timeout, navigation]);

  const onGamePress = React.useCallback(
    game => {
      closeModal();
      navigation.navigate(matchGameWithScreenName(game));
    },
    [closeModal, navigation],
  );

  return (
    <Pressable onPress={onPress} style={containerStyles}>
      <View style={styles.rowCenter}>
        <Text style={styles.index}>{index + 1}</Text>
        <FastImage
          source={{uri: item?.user?.[0]?.avatar}}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.textWrapper}>
        <Text style={styles.textGreenBold}>
          {Math.floor(item?.milliseconds / 1000)}
        </Text>
        <Text style={styles.textGreyReg}>{'s '}</Text>
        <Text style={styles.textGreenBold}>
          {normalizeMS(item?.milliseconds)}
        </Text>
        <Text style={styles.textGreyReg}>{dict?.rankFlipListLabel3}</Text>
      </Text>
      <Text style={styles.textWrapper}>
        <Text style={styles.textGreyReg}>{dict?.rankFlipListLabel1}</Text>
        <Text style={styles.textGreenBold}>{item?.flips}</Text>
        <Text style={styles.textGreyReg}>{dict?.rankFlipListLabel2}</Text>
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

export default RankFlipListItem;
