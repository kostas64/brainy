/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {View, Text, Animated, Pressable, Image, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {WIDTH, isIOS} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const GestureItTutorial = ({modalOpen, setModalOpen}) => {
  const navigation = useNavigation();
  const swipeRef = React.useRef();
  const translateXRef = React.useRef(new Animated.Value(0)).current;
  const translateYRef = React.useRef(new Animated.Value(0)).current;
  const opacityRef = React.useRef(new Animated.Value(1)).current;
  const tapOpacity1 = React.useRef(new Animated.Value(1)).current;
  const tapOpacity2 = React.useRef(new Animated.Value(1)).current;

  const [designState, setDesignState] = React.useState(1);

  //** ----- FUNCTIONS -----
  const designOne = React.useCallback(() => (
    <>
      <AnimatedImage
        source={images.tap}
        style={[
          styles.closeIcon,
          styles.designOne,
          {opacity: tapOpacity1, transform: [{translateY: translateYRef}]},
        ]}
      />
      <View style={styles.rowCenter}>
        <Image source={images.arrowBlack} style={styles.smallImg} />
        <View style={styles.rightSpacer} />
        <Image
          source={images.arrowBlack}
          style={[styles.smallImg, {transform: [{rotate: '180deg'}]}]}
        />
        <View style={styles.rightSpacer} />
        <Image source={images.arrowBlack} style={styles.smallImg} />
      </View>
    </>
  ));

  const designTwo = React.useCallback(() => (
    <>
      <AnimatedImage
        source={images.tap}
        style={[
          styles.closeIcon,
          styles.designTwo,
          {opacity: tapOpacity2, transform: [{translateX: translateXRef}]},
        ]}
      />
      <View style={styles.selfCenter}>
        <Image
          source={images.arrowBlack}
          style={[styles.smallImg, {transform: [{rotate: '90deg'}]}]}
        />
        <View style={styles.rightSpacer} />
        <Image
          source={images.arrowBlack}
          style={[
            styles.smallImg,
            {
              marginLeft: DimensionsUtils.getDP(24),
              transform: [{rotate: '270deg'}],
            },
          ]}
        />
        <View style={styles.rightSpacer} />
        <Image
          source={images.arrowBlack}
          style={[styles.smallImg, {transform: [{rotate: '90deg'}]}]}
        />
      </View>
    </>
  ));

  const swipeHandler = React.useCallback(e => {
    const event = e.nativeEvent;

    if (event.oldState === State.UNDETERMINED && event.x < 10 && isIOS) {
      navigation.pop();
    } else {
      if (event.oldState === State.ACTIVE && event.state === State.END) {
        if (
          Math.abs(event.translationX) > Math.abs(event.translationY) &&
          event.translationX > 0
        ) {
          swipeValidation('RIGHT');
        } else if (
          Math.abs(event.translationX) > Math.abs(event.translationY) &&
          event.translationX < 0
        ) {
          swipeValidation('LEFT');
        } else if (
          event.translationY > 0 &&
          event.translationY > Math.abs(event.translationX)
        ) {
          swipeValidation('DOWN');
        } else if (
          event.translationY < 0 &&
          Math.abs(event.translationY) > Math.abs(event.translationX)
        ) {
          swipeValidation('UP');
        }
      }
    }
  });

  const swipeValidation = React.useCallback(
    direction => {
      designState === 1 && direction === 'DOWN' && setDesignState(2);
      designState === 2 && direction === 'LEFT' && setDesignState(1);
    },
    [designState],
  );

  const closeModal = React.useCallback(() => {
    Animated.timing(opacityRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalOpen(false));
  }, []);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    Animated.timing(designState === 1 ? tapOpacity2 : tapOpacity1, {
      toValue: 1,
      duration: 10,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(designState === 1 ? translateYRef : translateXRef, {
          toValue: designState === 1 ? 48 : -48,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(designState === 1 ? tapOpacity1 : tapOpacity2, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(designState === 1 ? translateYRef : translateXRef, {
          toValue: 0,
          duration: 10,
          useNativeDriver: true,
        }),
        Animated.timing(designState === 1 ? tapOpacity1 : tapOpacity2, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [designState]);

  return (
    modalOpen && (
      <PanGestureHandler ref={swipeRef} onHandlerStateChange={swipeHandler}>
        <Animated.View style={[styles.container, {opacity: opacityRef}]}>
          <Pressable onPress={closeModal} style={styles.backgroundContainer} />

          <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.innerTitleContainer}>
                <Image source={images.tutorial} style={styles.icon} />
                <Text style={styles.title}>{dict.gestureItTutTitle}</Text>
              </View>
              <Touchable onPress={closeModal} releasingAnimationDuraiton={300}>
                <Image source={images.close} style={styles.closeIcon} />
              </Touchable>
            </View>
            <View style={styles.gameContainer}>
              {designState === 1 && designOne()}
              {designState === 2 && designTwo()}
            </View>
            <Text>
              <Text style={styles.text}>{`${dict.gestureItTutContent1} `}</Text>
              <Text
                style={[
                  styles.text,
                  styles.textBold,
                ]}>{`${dict.gestureItTutContent2} `}</Text>
              <Text style={styles.text}>{dict.gestureItTutContent3}</Text>
              <Text style={[styles.text, styles.textBold]}>
                {` ${dict.gestureItTutContent4} `}
              </Text>
              <Text style={styles.text}>{dict.gestureItTutContent5}</Text>
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    )
  );
};

const styles = StyleSheet.create({
  selfCenter: {
    alignSelf: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
  },
  innerContainer: {
    backgroundColor: Colors.white,
    borderRadius: DimensionsUtils.getDP(12),
    padding: DimensionsUtils.getDP(16),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: DimensionsUtils.getDP(52),
    height: DimensionsUtils.getDP(52),
  },
  closeIcon: {
    width: DimensionsUtils.getDP(36),
    height: DimensionsUtils.getDP(36),
  },
  title: {
    marginLeft: DimensionsUtils.getDP(16),
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(22),
    fontFamily: 'Poppins-SemiBold',
  },
  gameContainer: {
    height: DimensionsUtils.getDP(108),
    justifyContent: 'center',
  },
  text: {
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(16),
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
  textBold: {
    fontWeight: 'bold',
  },
  smallImg: {
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
  },
  rowCenter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  rightSpacer: {
    marginRight: DimensionsUtils.getDP(4),
  },
  designOne: {
    left: (WIDTH - DimensionsUtils.getDP(124)) / 2 - DimensionsUtils.getDP(86),
    position: 'absolute',
    top: DimensionsUtils.getDP(16),
  },
  designTwo: {
    top: DimensionsUtils.getDP(42),
    left: WIDTH / 2 - DimensionsUtils.getDP(108),
    position: 'absolute',
  },
});

export default GestureItTutorial;
