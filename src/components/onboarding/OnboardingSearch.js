import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const OnboardingSearch = () => {
  return (
    <>
      <Animated.View
        entering={FadeInUp.duration(400).delay(800)}
        style={styles.container1}>
        <Text style={styles.text}>{dict.onboardingStep2Tip1}</Text>
        <Animated.Image
          style={styles.img}
          resizeMode={'contain'}
          source={images.onboardSearch1}
          borderRadius={DimensionsUtils.getDP(12)}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(1000)}
        style={styles.container2}>
        <Text style={styles.text}>{dict.onboardingStep2Tip2}</Text>

        <Animated.Image
          style={styles.img}
          resizeMode={'contain'}
          source={images.onboardSearch2}
          borderRadius={DimensionsUtils.getDP(12)}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.duration(400).delay(1200)}
        style={styles.container3}>
        <Text style={styles.text}>{dict.onboardingStep2Tip3}</Text>
        <Animated.Image
          style={styles.img}
          resizeMode={'contain'}
          source={images.onboardSearch3}
          borderRadius={DimensionsUtils.getDP(12)}
        />
      </Animated.View>
    </>
  );
};

export default OnboardingSearch;

const styles = StyleSheet.create({
  container1: {
    left: -25,
    paddingBottom: DimensionsUtils.getDP(16),
  },
  container2: {
    left: 30,
    paddingBottom: DimensionsUtils.getDP(18),
  },
  container3: {
    left: -25,
  },
  img: {
    width: 285,
    height: 44,
  },
  text: {
    color: Colors.background,
    fontFamily: 'Poppins-Regular',
    paddingBottom: DimensionsUtils.getDP(4),
    fontSize: DimensionsUtils.getFontSize(14),
  },
});
