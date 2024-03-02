import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';

import React from 'react';

import {getSkeleton} from '../../utils/AnimateUtils';

const Skeleton = ({type, skeletonStyle, loading, children}) => {
  const opacity = useSharedValue(0.5);
  const opacityChildren = useSharedValue(0);
  const translateY = useSharedValue(25);

  //** ----- STYLES -----
  const animatedStyle = useAnimatedStyle(() => ({opacity: opacity.value}), []);

  const animatedChildren = useAnimatedStyle(
    () => ({
      opacity: opacityChildren.value,
      transform: [{translateY: translateY.value}],
    }),
    [],
  );

  //** ----- EFFECTS -----
  useAnimatedReaction(
    () => ({loading}),
    () => {
      if (loading) {
        opacity.value = 0.5;
        opacity.value = withRepeat(withTiming(1, {duration: 500}), -1, true);
      } else {
        translateY.value = 25;
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
    getSkeleton(type, skeletonStyle, animatedStyle)
  ) : (
    <Animated.View style={animatedChildren}>{children}</Animated.View>
  );
};

export default Skeleton;
