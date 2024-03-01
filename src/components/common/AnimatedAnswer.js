import React from 'react';
import {Animated, Image, StyleSheet} from 'react-native';

import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimatedAnswer = React.forwardRef(({}, ref) => {
  const translateY = React.useRef(new Animated.Value(0)).current;
  const opacityRef = React.useRef(new Animated.Value(0)).current;
  const [isCorrect, setIsCorrect] = React.useState(false);

  const iconComp = isCorrect ? (
    <Image source={images.correct} style={styles.icon} />
  ) : (
    <Image source={images.wrong} style={styles.icon} />
  );

  //** ----- FUNCTIONS -----
  const animateAnswer = answer => {
    setIsCorrect(answer);

    //Reset animation
    opacityRef.setValue(0);
    translateY.setValue(0);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacityRef, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 8,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacityRef, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  //** ----- EFFECTS -----
  React.useImperativeHandle(ref, () => ({
    animateAnswer,
  }));

  return (
    <Animated.View
      style={{
        opacity: opacityRef,
        transform: [{translateY}],
      }}>
      {iconComp}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: DimensionsUtils.getDP(36),
    height: DimensionsUtils.getDP(36),
  },
});

export default AnimatedAnswer;
