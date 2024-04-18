import {
  Text,
  View,
  StatusBar,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {storage} from '../..';
import {Colors} from '../utils/Colors';
import images from '../assets/images/images';
import {HEIGHT, WIDTH} from '../utils/GenericUtils';
import copies from '../assets/values/onboardingCopies';
import colors from '../assets/values/onboardingColors';
import {DimensionsUtils} from '../utils/DimensionUtils';

const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);

const DURATION = 1000;
const TEXT_DURATION = DURATION * 0.8;

const Circle = ({onPress, index, animatedValue, animatedValue2}) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];
  const {initialBgColor, nextBgColor, bgColor} = colors[index];

  const backgroundColor = animatedValue2.interpolate({
    inputRange,
    outputRange: [
      initialBgColor,
      initialBgColor,
      initialBgColor,
      bgColor,
      bgColor,
    ],
  });

  const dotBgColor = animatedValue2.interpolate({
    inputRange: [0, 0.001, 0.5, 0.501, 0.9, 1],
    outputRange: [
      bgColor,
      bgColor,
      bgColor,
      initialBgColor,
      initialBgColor,
      nextBgColor,
    ],
  });

  const buttonAnimStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.05, 0.5, 1],
          outputRange: [1, 0, 0, 1],
        }),
      },
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 0.5, 0.9, 1],
          outputRange: ['0deg', '180deg', '180deg', '180deg'],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.05, 0.9, 1],
      outputRange: [1, 0, 0, 1],
    }),
  };

  const circleAnimStyle = {
    backgroundColor: dotBgColor,
    transform: [
      {perspective: 200},
      {
        rotateY: animatedValue2.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['0deg', '-90deg', '-180deg'],
        }),
      },

      {
        scale: animatedValue2.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 6, 1],
        }),
      },

      {
        translateX: animatedValue2.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 25, 0],
        }),
      },
    ],
  };

  const barStyle = index % 2 === 0 ? 'light-content' : 'dark-content';

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {backgroundColor},
      ]}>
      <AnimatedStatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
      />
      <Animated.View style={[styles.circle, circleAnimStyle]}>
        <TouchableOpacity onPress={onPress}>
          <Animated.View style={[styles.button, buttonAnimStyle]}>
            <Animated.Image
              source={images.chevron}
              style={[styles.chevron, {tintColor: backgroundColor}]}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function OnboardingScreen({navigation}) {
  const insets = useSafeAreaInsets();

  const [index, setIndex] = React.useState(0);
  const inputRange = [...Array(copies.length).keys()];

  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animatedValue2 = React.useRef(new Animated.Value(0)).current;
  const sliderAnimatedValue = React.useRef(new Animated.Value(0)).current;

  const paddingTop =
    insets.top > 0
      ? insets.top + DimensionsUtils.getDP(32)
      : DimensionsUtils.getDP(32);

  const quotesAnimStyle = {
    transform: [
      {
        translateX: sliderAnimatedValue.interpolate({
          inputRange,
          outputRange: copies.map((_, i) => -i * WIDTH * 2),
        }),
      },
    ],
    opacity: sliderAnimatedValue.interpolate({
      inputRange: [...Array(copies.length * 2 + 1).keys()].map(i => i / 2),
      outputRange: [...Array(copies.length * 2 + 1).keys()].map(i =>
        i % 2 === 0 ? 1 : 0,
      ),
    }),
  };

  const animate = i =>
    Animated.parallel([
      Animated.timing(sliderAnimatedValue, {
        toValue: i,
        duration: TEXT_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    if (index < colors.length - 1) {
      animatedValue.setValue(0);
      animatedValue2.setValue(0);
      animate((index + 1) % colors.length).start();
      setIndex((index + 1) % colors.length);
    } else {
      storage.setBool('oboarding', false);
      navigation.navigate('GetStarted');
    }
  };

  return (
    <View style={[styles.container, {paddingTop}]}>
      <Circle
        index={index}
        onPress={onPress}
        animatedValue={animatedValue}
        animatedValue2={animatedValue2}
      />
      <Animated.View style={[styles.row, quotesAnimStyle]}>
        {copies
          .slice(0, colors.length)
          .map(({title, paragraph, component}, i) => {
            const componentStyle = {
              top:
                i === 0
                  ? (HEIGHT - 200) / 2 - paddingTop
                  : i === 1
                  ? 136 + (HEIGHT - paddingTop - 496) / 2
                  : (HEIGHT - 170) / 2 - paddingTop,
              left:
                i === 0
                  ? (WIDTH - 200) / 2
                  : i === 1
                  ? (WIDTH - 285) / 2
                  : (WIDTH - 280) / 2,
            };

            const paragraphStyle = {width: i === 0 || i === 1 ? 280 : 310};

            return (
              <View style={{paddingRight: WIDTH, width: WIDTH * 2}} key={i}>
                <Text style={[styles.title, {color: colors[i].nextBgColor}]}>
                  {title}
                </Text>
                <Text
                  style={[
                    styles.paragraph,
                    paragraphStyle,
                    {color: colors[i].nextBgColor},
                  ]}>
                  {paragraph}
                </Text>
                <View style={[styles.absolute, componentStyle]}>
                  {i === index && component}
                </View>
              </View>
            );
          })}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  absolute: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 50,
  },
  title: {
    margin: 12,
    fontSize: 26,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  paragraph: {
    fontSize: 18,
    width: 310,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    height: 72,
    width: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: 'turquoise',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  chevron: {
    left: 1,
    width: 32,
    height: 32,
  },
});
