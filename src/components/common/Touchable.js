import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Pressable} from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Touchable = ({
  style,
  onPress,
  children,
  disabled,
  onPressIn,
  onPressOut,
  activeOpacity = 0.2,
  pressingAnimationDuration = 150,
  releasingAnimationDuraiton = 150,
}) => {
  const opacity = useSharedValue(1);

  //** ----- STYLES -----
  const animatedStyle = useAnimatedStyle(() => ({opacity: opacity.value}), []);

  //** ----- FUNCTIONS -----
  const onPressing = React.useCallback(() => {
    opacity.value = withTiming(activeOpacity, {
      duration: pressingAnimationDuration,
    });

    !!onPressIn && onPressIn();
  }, [opacity, onPressIn, activeOpacity, pressingAnimationDuration]);

  const onRelease = React.useCallback(() => {
    opacity.value = withTiming(1, {
      duration: releasingAnimationDuraiton,
    });

    !!onPressOut && onPressOut();
  }, [opacity, onPressOut, releasingAnimationDuraiton]);

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={onPressing}
      onPressOut={onRelease}
      style={[animatedStyle, style]}>
      {children}
    </AnimatedPressable>
  );
};

export default Touchable;
