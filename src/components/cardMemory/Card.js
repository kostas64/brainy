import {
  Text,
  Easing,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width: WIDTH} = Dimensions.get('window');

const Card = ({value, index, isFlipped, setIsFlipped}) => {
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
    <Pressable onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}>
      <Animated.View
        style={[
          {
            ...flipToBackStyle,
          },
          styles.front,
        ]}>
        <Text style={{fontSize: 48, fontWeight: '900'}}>{value}</Text>
      </Animated.View>
      <Animated.View
        style={[
          {
            ...flipToFrontStyle,
          },
          styles.back,
        ]}>
        <Text style={{fontSize: 48, fontWeight: '900'}}>?</Text>
      </Animated.View>
    </Pressable>
  );
};

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
});

export default Card;
