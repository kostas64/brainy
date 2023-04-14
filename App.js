import {
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

function App() {
  let flipRotation = 0;
  const flipAnimation = React.useRef(new Animated.Value(0)).current;
  flipAnimation.addListener(({value}) => (flipRotation = value));

  const [flipAnimArray, setFlipAnimArray] = React.useState(
    new Array(9).fill(React.useRef(new Animated.Value(0)).current),
  );
  const [cards, setCards] = React.useState(
    new Array(9).fill({
      flipped: 0,
    }),
  );

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
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 200,
        marginHorizontal: WIDTH / 16,
      }}>
      {cards.map((_, index) => (
        <Pressable
          key={index}
          onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}>
          <Animated.View
            style={[
              {
                ...flipToBackStyle,
              },
              styles.front,
            ]}>
            <Text style={{fontSize: 48, fontWeight: '900'}}>X</Text>
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
      ))}
    </View>
  );
}

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

export default App;
