import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, Animated, StatusBar, Image, StyleSheet} from 'react-native';

import {Colors} from '../utils/Colors';
import {signIn} from '../services/auth';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Button from '../components/common/Button';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {HEIGHT, isAndroid} from '../utils/GenericUtils';
import {useModalContext} from '../context/ModalProvider';
import {requestNotPermissions} from '../utils/PermissionUtils';
import CircularTransition from '../components/transitions/CircularTransition';

const GetStartedScreen = () => {
  const insets = useSafeAreaInsets();
  const {closeModal, setModalInfo} = useModalContext();
  const {token, setToken, user, setUser} = useAuthContext();

  const opacityRef = React.useRef(new Animated.Value(0)).current;
  const translateYRef = React.useRef(new Animated.Value(10)).current;

  const [loading, setLoading] = React.useState(false);
  const [outCircle, setOutCircle] = React.useState(null);
  const [positionCirc, setPositionCirc] = React.useState({
    posX: -100,
    posY: -100,
  });

  const mainButtonLabel = token
    ? dict?.getStartedLoggedInButton
    : dict?.getStartedLoginButton;

  //** ----- FUNCTIONS -----
  const setCircle = React.useCallback((e, color) => {
    setOutCircle(color);
    setClickCoords(e.nativeEvent.pageX, e.nativeEvent.pageY);
  }, []);

  const navigate = async (e, type) => {
    if (type === 'login') {
      if (!token) {
        await signIn(
          setToken,
          setUser,
          setLoading,
          setModalInfo,
          () => setCircle(e, Colors.appGreen),
          closeModal,
        );
      } else {
        setUser({
          email: user?.email,
          avatar: user?.avatar,
          isGuest: false,
          name: user?.name,
          surname: user?.surname,
          nickname: user?.nickname,
        });

        setCircle(e, Colors.appGreen);
      }
    } else {
      setUser({
        email: user?.email,
        avatar: user?.avatar,
        isGuest: true,
        name: user?.name,
        surname: user?.surname,
        nickname: user?.nickname,
      });
      setCircle(e, Colors.white);
    }
  };

  const setClickCoords = (posX, posY) => {
    setPositionCirc({
      posX,
      posY,
    });
  };

  //** ----- EFFECTS -----
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
    ]).start(({finished}) => {
      if (finished) {
        requestNotPermissions();
      }
    });
  }, [opacityRef, translateYRef]);

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
        <Image
          source={images.logo}
          style={[isAndroid && styles.spaceTop, styles.image]}
        />
      </View>

      <Animated.View
        style={[
          styles.nameContainer,
          {opacity: opacityRef, transform: [{translateY: translateYRef}]},
        ]}>
        <Text style={styles.name}>{dict.appName}</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.subContainer,
          {
            opacity: opacityRef,
            transform: [{translateY: translateYRef}],
            bottom: insets.bottom + DimensionsUtils.getDP(24),
          },
        ]}>
        <Button
          loading={loading}
          disabled={loading}
          label={mainButtonLabel}
          onPress={e => navigate(e, 'login')}
          containerStyle={[loading && styles.lowOpacity]}
          extraLabel={user?.email ? `(${user?.email})` : null}
        />
        <Button
          disabled={loading}
          labelStyle={styles.greenLabel}
          onPress={e => navigate(e, 'guest')}
          label={dict?.getStartedGuestButton}
          containerStyle={[loading && styles.lowOpacity, styles.whiteBG]}
        />
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
    fontSize: DimensionsUtils.getFontSize(26),
  },
  subContainer: {
    alignSelf: 'center',
    position: 'absolute',
  },
  lowOpacity: {
    opacity: 0.4,
  },
  whiteBG: {
    marginTop: DimensionsUtils.getDP(8),
    backgroundColor: Colors.white,
  },
  greenLabel: {
    color: Colors.appGreen,
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(26),
  },
});

export default GetStartedScreen;
