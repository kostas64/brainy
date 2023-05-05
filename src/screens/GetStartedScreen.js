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
import {DimensionsUtils} from '../utils/DimensionUtils';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const GetStartedScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {setOptions} = useNavigation();

  const opacityRef = React.useRef(new Animated.Value(0)).current;
  const translateYRef = React.useRef(new Animated.Value(10)).current;

  React.useEffect(() => {
    setOptions({gestureEnabled: false});
  }, [setOptions]);

  const navigate = () => {
    navigation.navigate('GamesStack');
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
        <Text style={styles.name}>Brainy</Text>
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
        <Text style={styles.subtitle}>
          Have fun with a big collection of brain games
        </Text>
        <Pressable style={styles.buttonContainer} onPress={navigate}>
          <Text style={styles.buttonLabel}>Get Started</Text>
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
