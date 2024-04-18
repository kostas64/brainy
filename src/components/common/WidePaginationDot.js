import Animated, {
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const WidePaginationDot = ({x, frameWidth, index, color, isLast}) => {
  const rDotStyle = useAnimatedStyle(() => {
    const width = interpolate(
      x.value,
      [(index - 1) * frameWidth, index * frameWidth, (index + 1) * frameWidth],
      [8, 36, 8],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      x.value,
      [(index - 1) * frameWidth, index * frameWidth, (index + 1) * frameWidth],
      [0.3, 1, 0.3],
      Extrapolation.CLAMP,
    );

    return {
      width,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        rDotStyle,
        styles.dot,
        {backgroundColor: color},
        isLast && styles.marginRight0,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    elevation: 10,
    marginRight: DimensionsUtils.getDP(6),
    borderRadius: DimensionsUtils.getDP(16),
    shadowColor: Colors.appGreen,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  marginRight0: {
    marginRight: 0,
  },
});

export default WidePaginationDot;
