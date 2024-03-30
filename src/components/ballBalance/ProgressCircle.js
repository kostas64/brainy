import React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {View, StyleSheet} from 'react-native';
import Animated, {useAnimatedProps} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle = ({
  size,
  progress,
  barColor,
  strokeWidth,
  borderColor,
}) => {
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumRef = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumRef * (1 - progress.value),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate: '-90deg'}]}}>
        <Svg width={size} height={size} fill={'transparent'}>
          <Circle
            stroke={borderColor}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            stroke={barColor}
            cx={center}
            cy={center}
            r={radius}
            strokeLinecap={'round'}
            strokeWidth={strokeWidth}
            strokeDasharray={circumRef}
            animatedProps={animatedProps}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default ProgressCircle;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 30,
  },
  icon: {
    position: 'absolute',
    left: 57,
    top: 54,
  },
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
