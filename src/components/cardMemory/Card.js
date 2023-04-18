import {
  Text,
  Easing,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useImperativeHandle} from 'react';

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
        duration: 300,
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
    height: WIDTH / 4,
    width: WIDTH / 4,
    backgroundColor: '#D8D9CF',
    borderRadius: 16,
    marginBottom: WIDTH / 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  back: {
    height: WIDTH / 4,
    width: WIDTH / 4,
    backgroundColor: '#FF8787',
    borderRadius: 16,
    marginBottom: WIDTH / 16,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 48,
    fontWeight: '900',
    color: 'black',
  },
});

export default Card;
