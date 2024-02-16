import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {triggerHaptik} from '../../utils/GenericUtils';

const CustomSwitch = ({size, value, setValue}) => {
  const SIZE = size || 60;
  const translateX = useSharedValue(0);

  const animateIOS = React.useCallback(() => {
    triggerHaptik();
    setValue(!value);
  }, [value, setValue]);

  const animStyle = useAnimatedStyle(
    () => ({transform: [{translateX: translateX.value}]}),
    [],
  );

  React.useEffect(() => {
    const toValue = value ? SIZE / 2 : 0;
    translateX.value = withTiming(toValue, {duration: 250});
  }, [value, SIZE, translateX]);

  return (
    <Pressable onPress={animateIOS}>
      <View
        style={[
          styles.justifyCenter,
          {
            width: SIZE,
            height: SIZE / 2,
            borderRadius: SIZE / 4,
            paddingHorizontal: SIZE / 30,
            backgroundColor: !value ? Colors.veryLightGrey : Colors.appGreen,
          },
        ]}>
        <Animated.View
          style={[
            animStyle,
            styles.dot,
            {
              width: SIZE / 2 - 4,
              height: SIZE / 2 - 4,
              borderRadius: (SIZE / 2 - 4) / 2,
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  justifyCenter: {
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: 'white',
  },
});
