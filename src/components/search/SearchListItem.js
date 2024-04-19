import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import {WIDTH} from '../../utils/GenericUtils';
import images from '../../assets/images/images';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SearchListItem = ({item, style, isLast = false}) => {
  const {user} = useAuthContext();
  const navigation = useNavigation();

  const username = `${item.name} ${item.surname}`;
  const nickname = `${item.nickname ? item.nickname : ''}`;

  //** ----- STYLES -----
  const containerStyle = [
    styles.container,
    styles.rowCenter,
    isLast && styles.lastPadding,
    style,
  ];

  //** ----- FUNCTIONS -----
  const onPress = React.useCallback(() => {
    const isMe = !user?.isGuest && user?.email === item?.email;

    if (isMe) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        item: {
          user: [
            {
              _id: item._id,
              nickname: item?.nickname,
              name: item?.name,
              surname: item?.surname,
              avatar: item?.avatar,
            },
          ],
        },
      });
    }
  }, [user, navigation, item]);

  return (
    <>
      <Touchable
        onPress={onPress}
        pressingAnimationDuration={25}
        releasingAnimationDuraiton={50}
        style={containerStyle}>
        <View style={styles.rowCenter}>
          <FastImage
            style={styles.avatar}
            source={{uri: item.avatar}}
            defaultSource={images.guest}
          />
          <View style={styles.spaceLeft}>
            <Text numberOfLines={1} style={styles.userName}>
              {username}
            </Text>

            <Text numberOfLines={1} style={styles.nickName}>
              {nickname}
            </Text>
          </View>
        </View>
        <Image source={images.chevron} style={styles.arrow} />
      </Touchable>
      {!isLast && <View style={styles.line} />}
    </>
  );
};

export default SearchListItem;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    paddingVertical: DimensionsUtils.getDP(16),
  },
  avatar: {
    width: DimensionsUtils.getDP(42),
    height: DimensionsUtils.getDP(42),
    borderRadius: DimensionsUtils.getDP(21),
  },
  spaceLeft: {
    marginLeft: DimensionsUtils.getDP(12),
  },
  userName: {
    lineHeight: 18,
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    width: WIDTH - DimensionsUtils.getDP(124),
    fontSize: DimensionsUtils.getFontSize(16),
  },
  nickName: {
    height: 22,
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    marginTop: DimensionsUtils.getDP(2),
    width: WIDTH - DimensionsUtils.getDP(124),
    fontSize: DimensionsUtils.getFontSize(14),
  },
  arrow: {
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(16),
    height: DimensionsUtils.getDP(16),
    marginRight: DimensionsUtils.getDP(12),
  },
  line: {
    height: 1,
    left: DimensionsUtils.getDP(54),
    backgroundColor: Colors.lightAppGreen,
    width: WIDTH - DimensionsUtils.getDP(90),
  },
  lastPadding: {
    paddingBottom: DimensionsUtils.getDP(16),
  },
});
