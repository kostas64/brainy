import React from 'react';
import FastImage from 'react-native-fast-image';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SearchListItem = ({item}) => {
  return (
    <Pressable style={styles.container}>
      <FastImage source={{uri: item.avatar}} style={styles.avatar} />
      <View style={styles.spaceLeft}>
        <Text
          numberOfLines={1}
          style={styles.userName}>{`${item.name} ${item.surname}`}</Text>

        <Text style={styles.nickName}>{`${
          item.nickname ? item.nickname : ''
        }`}</Text>
      </View>
    </Pressable>
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
    fontSize: DimensionsUtils.getDP(14),
  },
});
