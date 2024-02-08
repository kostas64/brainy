import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useModalContext} from '../../context/ModalProvider';
import UserProfileModal from '../userProfileModal/UserProfileModal';

const RankFlipListItem = ({item, index, isMe}) => {
  const {setModalInfo} = useModalContext();

  const onPress = React.useCallback(() => {
    setModalInfo({
      height: 420,
      content: <UserProfileModal isMe={isMe} item={item} />,
    });
  }, [item, isMe, setModalInfo]);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles.rowCenter,
        isMe && {backgroundColor: Colors.tabBarBg},
      ]}>
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
          {Math.floor(item?.milliseconds % 1000)}
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
});

export default RankFlipListItem;
