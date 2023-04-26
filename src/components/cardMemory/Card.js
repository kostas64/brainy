import {
  Text,
  Easing,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useImperativeHandle} from 'react';

import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const {width: WIDTH} = Dimensions.get('window');

const Card = React.forwardRef(
  ({value, index, cardsDisabled, isFlipped, setIsFlipped}, ref) => {
    let flipRotation = isFlipped;
    const flipAnimation = React.useRef(new Animated.Value(0)).current;

    flipAnimation.addListener(({value}) => (flipRotation = value));

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

    useImperativeHandle(ref, () => ({
      flipToBack,
    }));

    const flipToFront = () => {
      setIsFlipped(index);
      Animated.timing(flipAnimation, {
        toValue: 180,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    const flipToBack = () => {
      setIsFlipped(index);
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Pressable
        disabled={cardsDisabled}
        onPress={() => !flipRotation && flipToFront()}>
        <Animated.View
          style={[
            {
              ...flipToBackStyle,
            },
            styles.front,
          ]}>
          <Text style={styles.label}>{value}</Text>
        </Animated.View>
        <Animated.View
          style={[
            {
              ...flipToFrontStyle,
            },
            styles.back,
          ]}>
          <Text style={styles.label}>?</Text>
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  front: {
    height: DimensionsUtils.getDP(WIDTH / 5),
    width: DimensionsUtils.getDP(WIDTH / 5),
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: DimensionsUtils.getDP(16),
    marginBottom: DimensionsUtils.getDP(WIDTH / 16),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  back: {
    height: DimensionsUtils.getDP(WIDTH / 5),
    width: DimensionsUtils.getDP(WIDTH / 5),
    backgroundColor: 'rgba(255,135,135,0.9)',
    borderRadius: DimensionsUtils.getDP(16),
    marginBottom: DimensionsUtils.getDP(WIDTH / 16),
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: GenericUtils.fontFamily(),
    fontSize: DimensionsUtils.getFontSize(48),
    color: 'black',
  },
});

export default Card;
