import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

import FastImage from 'react-native-fast-image';
import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const HomeGameCard = ({onPress, image}) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.label}>Memory Cards</Text>
      <FastImage source={image} style={styles.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#043442',
    fontFamily: GenericUtils.fontFamily(),
    fontSize: DimensionsUtils.getDP(18),
  },
  image: {
    width: DimensionsUtils.getDP(192),
    height: DimensionsUtils.getDP(112),
    borderRadius: DimensionsUtils.getDP(8),
  },
});

export default HomeGameCard;
