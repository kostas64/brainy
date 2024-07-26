import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {Colors} from '../../../utils/Colors';
import images from '../../../assets/images/images';
import {DimensionsUtils} from '../../../utils/DimensionUtils';

const GestureIcon = () => {
  return (
    <View style={styles.container}>
      <Image source={images.arrowBlack} style={styles.img} />
    </View>
  );
};

export default GestureIcon;

const styles = StyleSheet.create({
  container: {
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  img: {
    tintColor: Colors.white,
    width: DimensionsUtils.getDP(12),
    height: DimensionsUtils.getDP(12),
  },
});
