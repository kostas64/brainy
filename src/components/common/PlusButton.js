import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const PlusButton = ({onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={images.plus} style={styles.image} />
    </Pressable>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.appGreen,
    padding: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(32),
    shadowColor: Colors.appGreen,
    shadowRadius: 20,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 30,
  },
  image: {
    tintColor: Colors.background,
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
  },
});
