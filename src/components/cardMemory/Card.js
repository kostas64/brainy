/* eslint-disable no-shadow */
import React from 'react';
import {Text, Animated, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH, isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Card = React.forwardRef(
  ({value, index, cardsDisabled, isFlipped, setIsFlipped}, ref) => {
    let flipRotation = isFlipped;
    const flipAnimation = React.useRef(new Animated.Value(0)).current;

    flipAnimation.addListener(({value}) => (flipRotation = value));

    //** ----- STYLES -----
    const flipToFrontStyle = {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };

    const flipToBackStyle = {
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    };

    //** ----- FUNCTIONS -----
    const flipToFront = React.useCallback(() => {
      setIsFlipped(index);
      Animated.timing(flipAnimation, {
        toValue: 180,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, [index, flipAnimation, setIsFlipped]);

    const flipToBack = React.useCallback(() => {
      setIsFlipped(index);
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 125,
        useNativeDriver: true,
      }).start();
    }, [index, flipAnimation, setIsFlipped]);

    //** ----- EFFECTS -----
    React.useImperativeHandle(ref, () => ({
      flipToBack,
    }));

    return (
      <Pressable
        disabled={cardsDisabled}
        onPress={() => !flipRotation && flipToFront()}>
        <Animated.View style={[{...flipToBackStyle}, styles.front]}>
          <Text style={styles.label}>{value}</Text>
        </Animated.View>
        <Animated.View style={[{...flipToFrontStyle}, styles.back]}>
          <Text style={styles.labelBack}>?</Text>
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  front: {
    height: WIDTH / 5,
    width: WIDTH / 5,
    backgroundColor: Colors.background,
    borderRadius: DimensionsUtils.getDP(16),
    borderWidth: 1,
    borderColor: Colors.appGreen,
    marginBottom: (WIDTH - WIDTH / 8 - (4 * WIDTH) / 5) / 3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  back: {
    height: WIDTH / 5,
    width: WIDTH / 5,
    backgroundColor: Colors.white,
    borderRadius: DimensionsUtils.getDP(16),
    marginBottom: (WIDTH - WIDTH / 8 - (4 * WIDTH) / 5) / 3,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.white,
    top: isAndroid ? 3 : 0,
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(48),
  },
  labelBack: {
    color: Colors.black,
    top: isAndroid ? 3 : 0,
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(48),
  },
});

export default Card;
