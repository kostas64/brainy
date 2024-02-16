import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const FriendsListItem = ({item}) => {
  return (
    <View style={styles.row}>
      <FastImage style={styles.avatar} source={{uri: item.friendUserAvatar}} />
      <View style={styles.nameContainer}>
        <Text numberOfLines={2} style={styles.name}>
          {`${item.friendUserName} ${item.friendUserSurname}`}
        </Text>
      </View>
    </View>
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
