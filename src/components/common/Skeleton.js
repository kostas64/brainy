import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Skeleton = ({skeletonStyle, loading, children}) => {
  const opacity = useSharedValue(0.5);
  const opacityChildren = useSharedValue(0);
  const translateY = useSharedValue(25);

  //** ----- STYLES -----
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedChildren = useAnimatedStyle(() => ({
    opacity: opacityChildren.value,
    transform: [{translateY: translateY.value}],
  }));

  //** ----- EFFECTS -----
  useAnimatedReaction(
    () => ({loading}),
    () => {
      if (loading) {
        opacity.value = 0.5;
        translateY.value = 25;
        opacity.value = withRepeat(withTiming(1, {duration: 500}), -1, true);
      } else {
        opacityChildren.value = withTiming(1, {
          duration: 500,
        });
        translateY.value = withTiming(0, {
          duration: 500,
        });

        cancelAnimation(opacity);
      }
    },
    [loading],
  );

  return loading ? (
    <>
      <Animated.View style={[animatedStyle, styles.skeleton, skeletonStyle]} />
      <Animated.View style={[animatedStyle, styles.skeleton, skeletonStyle]} />
      <Animated.View style={[animatedStyle, styles.skeleton, skeletonStyle]} />
    </>
  ) : (
    <Animated.View style={animatedChildren}>{children}</Animated.View>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  skeleton: {
    alignSelf: 'center',
    borderRadius: DimensionsUtils.getDP(8),
    width: WIDTH - DimensionsUtils.getDP(32),
    height: DimensionsUtils.getDP(50),
    backgroundColor: Colors.lightGrey,
  },
});
