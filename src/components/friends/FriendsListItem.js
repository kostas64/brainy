import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const FriendsListItem = ({item}) => {
  const navigation = useNavigation();

  const onPress = React.useCallback(() => {
    navigation.navigate('Profile', {
      item: {
        user: [
          {
            _id: item.friendUserId,
            nickname: item?.friendUserNickname,
            name: item?.friendUserName,
            surname: item?.friendUserSurname,
            avatar: item?.friendUserAvatar,
          },
        ],
      },
    });
  }, [item, navigation]);

  return (
    <Touchable
      onPress={onPress}
      style={styles.row}
      pressingAnimationDuration={25}
      releasingAnimationDuraiton={50}>
      <FastImage style={styles.avatar} source={{uri: item.friendUserAvatar}} />
      <View style={styles.nameContainer}>
        <Text numberOfLines={2} style={styles.name}>
          {`${item.friendUserName} ${item.friendUserSurname}`}
        </Text>
      </View>
    </Touchable>
  );
};

export default FriendsListItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameContainer: {
    marginLeft: DimensionsUtils.getDP(16),
    width: WIDTH - DimensionsUtils.getDP(154),
  },
  name: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(18),
  },
});
