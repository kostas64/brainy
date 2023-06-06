import {
  View,
  Text,
  Platform,
  Animated,
  Pressable,
  StatusBar,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {signIn} from '../services/auth';
import dict from '../assets/values/dict.json';
import {GenericUtils} from '../utils/GenericUtils';
import {AuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import CircularTransition from '../components/transitions/CircularTransition';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const GetStartedScreen = () => {
  const insets = useSafeAreaInsets();
  const {setOptions} = useNavigation();
  const {token, setToken, user, setUser} = useContext(AuthContext);

  const opacityRef = React.useRef(new Animated.Value(0)).current;
  const translateYRef = React.useRef(new Animated.Value(10)).current;

  const [loading, setLoading] = React.useState(false);
  const [outCircle, setOutCircle] = React.useState(null);
  const [positionCirc, setPositionCirc] = React.useState({
    posX: -100,
    posY: -100,
  });

  React.useEffect(() => {
    setOptions({gestureEnabled: false});
  }, [setOptions]);

  const navigate = async (e, type) => {
    if (type === 'login') {
      let logged = false;
      if (!token) {
        logged = await signIn(setToken, setUser, setLoading);
      } else {
        logged = true;
        setUser({
          email: user?.email,
          avatar: user?.avatar,
          isGuest: false,
        });
      }
      logged && setOutCircle(Colors.appGreen);
      logged && setClickCoords(e.nativeEvent.pageX, e.nativeEvent.pageY);
    } else {
      setUser({
        email: user?.email,
        avatar: user?.avatar,
        isGuest: true,
      });
      setOutCircle(Colors.white);
      setClickCoords(e.nativeEvent.pageX, e.nativeEvent.pageY);
    }
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
      <CircularTransition
        posX={positionCirc.posX}
        posY={positionCirc.posY}
        inCircleColor={Colors.background}
        outCircleColor={outCircle}
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
        <Text
          style={[
            styles.subtitle,
            {
              fontSize: GenericUtils.adaptLayout(
                DimensionsUtils.getFontSize(18),
                DimensionsUtils.getFontSize(22),
              ),
            },
          ]}>
          {dict.getStartedSub}
        </Text>
        <Pressable
          disabled={loading}
          style={[styles.buttonContainer, loading && {opacity: 0.4}]}
          onPress={e => navigate(e, 'login')}>
          {!loading ? (
            <Text
              style={[
                styles.buttonLabel,
                {
                  fontSize: GenericUtils.adaptLayout(
                    DimensionsUtils.getFontSize(18),
                    DimensionsUtils.getFontSize(20),
                  ),
                },
              ]}>
              {!!token
                ? dict?.getStartedLoggedInButton
                : dict?.getStartedLoginButton}
            </Text>
          ) : (
            <ActivityIndicator size={'small'} color={'white'} />
          )}
          {!!token && !!user?.email && (
            <Text style={styles.loggedName}>{`(${user?.email})`}</Text>
          )}
        </Pressable>
        <Pressable
          disabled={loading}
          style={[
            styles.buttonContainer,
            loading && {opacity: 0.4},
            {backgroundColor: Colors.white},
          ]}
          onPress={e => navigate(e, 'guest')}>
          <Text
            style={[
              styles.buttonLabel,
              {
                color: Colors.appGreen,
                fontSize: GenericUtils.adaptLayout(
                  DimensionsUtils.getFontSize(18),
                  DimensionsUtils.getFontSize(20),
                ),
              },
            ]}>
            {dict?.getStartedGuestButton}
          </Text>
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
    minHeight: DimensionsUtils.getDP(52),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DimensionsUtils.getDP(8),
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
  loggedName: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(12),
  },
});

export default GetStartedScreen;
