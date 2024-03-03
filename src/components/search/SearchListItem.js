import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import {WIDTH} from '../../utils/GenericUtils';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SearchListItem = ({item, style}) => {
  const {user} = useAuthContext();
  const navigation = useNavigation();

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
    <Touchable
      onPress={onPress}
      pressingAnimationDuration={25}
      releasingAnimationDuraiton={50}
      style={[styles.container, style]}>
      <FastImage source={{uri: item.avatar}} style={styles.avatar} />
      <View style={styles.spaceLeft}>
        <Text
          numberOfLines={1}
          style={styles.userName}>{`${item.name} ${item.surname}`}</Text>

        <Text style={styles.nickName}>{`${
          item.nickname ? item.nickname : ''
        }`}</Text>
      </View>
    </Touchable>
  );
};

export default SearchListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: DimensionsUtils.getDP(24),
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
    width: WIDTH - DimensionsUtils.getDP(90),
    fontSize: DimensionsUtils.getFontSize(16),
  },
  nickName: {
    height: 22,
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    marginTop: DimensionsUtils.getDP(2),
    fontSize: DimensionsUtils.getFontSize(14),
  },
});
