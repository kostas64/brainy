import {
  View,
  Text,
  Platform,
  Animated,
  Pressable,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import {DimensionsUtils} from '../utils/DimensionUtils';
import CircularTransition from '../components/transitions/CircularTransition';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const GetStartedScreen = () => {
  const insets = useSafeAreaInsets();
  const {setOptions} = useNavigation();

  const opacityRef = React.useRef(new Animated.Value(0)).current;
  const translateYRef = React.useRef(new Animated.Value(10)).current;

  const [positionCirc, setPositionCirc] = React.useState({
    posX: -100,
    posY: -100,
  });

  React.useEffect(() => {
    setOptions({gestureEnabled: false});
  }, [setOptions]);

  const navigate = e => {
    setClickCoords(e.nativeEvent.pageX, e.nativeEvent.pageY);
  };

  const setClickCoords = (posX, posY) => {
    setPositionCirc({
      posX,
      posY,
    });
  };

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityRef, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYRef, {
        toValue: -5,
        duration: 850,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.background}
      />
      <CircularTransition posX={positionCirc.posX} posY={positionCirc.posY} />
      <View style={styles.imageContainer}>
        <FastImage
          source={require('../assets/images/logo.png')}
          style={[
            Platform.OS === 'android' && {
              marginTop: DimensionsUtils.getDP(26),
            },
            styles.image,
          ]}
        />
      </View>
      <Animated.View
        style={[
          styles.nameContainer,
          {
            opacity: opacityRef,
            transform: [
              {
                translateY: translateYRef,
              },
            ],
          },
        ]}>
        <Text style={styles.name}>{dict.appName}</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.subContainer,
          {
            opacity: opacityRef,
            transform: [
              {
                translateY: translateYRef,
              },
            ],
            bottom: insets.bottom + DimensionsUtils.getDP(24),
          },
        ]}>
        <Text style={styles.subtitle}>{dict.getStartedSub}</Text>
        <Pressable style={styles.buttonContainer} onPress={navigate}>
          <Text style={styles.buttonLabel}>{dict?.getStartedButton}</Text>
        </Pressable>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  image: {
    width: DimensionsUtils.getDP(204),
    height: DimensionsUtils.getDP(244),
  },
  nameContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: (HEIGHT + DimensionsUtils.getDP(214)) / 2,
  },
  name: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: DimensionsUtils.getFontSize(32),
  },
  subContainer: {
    alignSelf: 'center',
    position: 'absolute',
  },
  subtitle: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(22),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: DimensionsUtils.getDP(16),
    backgroundColor: Colors.appGreen,
    borderRadius: DimensionsUtils.getDP(12),
    paddingVertical: DimensionsUtils.getDP(12),
    width: WIDTH - DimensionsUtils.getDP(40),
  },
  buttonLabel: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: DimensionsUtils.getFontSize(20),
  },
});

export default GetStartedScreen;
