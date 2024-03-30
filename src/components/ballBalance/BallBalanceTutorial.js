import Animated, {
  withTiming,
  runOnJS,
  withRepeat,
  interpolate,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import ProgressCircle from './ProgressCircle';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const BallBalanceTutorial = ({modalOpen, setModalOpen}) => {
  const opacity = useSharedValue(1);
  const progress = useSharedValue(0);
  const animation = useSharedValue(0);

  //** ----- STYLES -----
  const animContainer = useAnimatedStyle(() => ({opacity: opacity.value}), []);

  const animMobile = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateX: `-${interpolate(
            animation.value,
            [0, 0.5],
            [0, 45],
            Extrapolation.CLAMP,
          )}deg`,
        },
        {
          rotateY: `${interpolate(
            animation.value,
            [0, 0.5],
            [0, 45],
            Extrapolation.CLAMP,
          )}deg`,
        },
      ],
    }),
    [],
  );

  const animBall = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: interpolate(
            animation.value,
            [0, 0.1, 0.5],
            [-32, -32, 32],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            animation.value,
            [0, 0.1, 0.5],
            [0, 0, 33],
            Extrapolation.CLAMP,
          ),
        },
      ],
    }),
    [],
  );

  useDerivedValue(() => {
    if (modalOpen) {
      if (animation.value >= 0.5) {
        progress.value = interpolate(
          animation.value,
          [0.5, 1],
          [0, 1],
          Extrapolation.CLAMP,
        );
      } else if (progress.value > 0) {
        progress.value = 0;
      }
    }
  }, [modalOpen, animation]);

  //** ----- FUNCTIONS -----
  const closeModal = React.useCallback(() => {
    opacity.value = withTiming(0, {duration: 300}, done => {
      if (done) {
        runOnJS(setModalOpen)(false);
      }
    });
  }, [opacity, setModalOpen]);

  const animateBall = React.useCallback(() => {
    animation.value = withRepeat(withTiming(1, {duration: 5000}), -1);
  }, [animation]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    animateBall();
  }, []);

  return (
    modalOpen && (
      <Animated.View accessible style={[styles.container, animContainer]}>
        <Pressable onPress={closeModal} style={styles.backgroundContainer} />
        <View accessible style={styles.innerContainer}>
          <View accessible style={styles.titleContainer}>
            <View style={styles.innerTitleContainer}>
              <Image source={images.tutorial} style={styles.icon} />
              <Text style={styles.title}>{dict.ballBalanceGameTitle}</Text>
            </View>
            <Touchable
              testID="pressOut"
              onPress={closeModal}
              releasingAnimationDuraiton={300}>
              <Image source={images.close} style={styles.closeIcon} />
            </Touchable>
          </View>
          {/* Animations */}
          <View style={styles.spaceVertical}>
            <Animated.Image
              source={images.mobile}
              style={[styles.mobile, animMobile]}
            />
            <Animated.View style={[styles.ball, animBall]} />
            <View style={styles.circleContainer}>
              <ProgressCircle
                size={42}
                strokeWidth={4}
                progress={progress}
                barColor={Colors.tabBarIcon}
                borderColor={Colors.tabBarBg}
              />
            </View>
          </View>

          <Text style={styles.text}>{dict.ballBalanceTutContent}</Text>
        </View>
      </Animated.View>
    )
  );
};

export default BallBalanceTutorial;

const styles = StyleSheet.create({
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
    flex: 1,
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
    marginBottom: DimensionsUtils.getDP(8),
  },
  innerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: DimensionsUtils.getDP(50),
    height: DimensionsUtils.getDP(50),
  },
  title: {
    marginLeft: DimensionsUtils.getDP(16),
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(20),
    fontFamily: 'Poppins-SemiBold',
  },
  closeIcon: {
    width: DimensionsUtils.getDP(36),
    height: DimensionsUtils.getDP(36),
  },
  mobile: {
    left: DimensionsUtils.getDP(24),
    width: DimensionsUtils.getDP(40),
    height: DimensionsUtils.getDP(40),
  },
  circleContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: DimensionsUtils.getDP(24),
    transform: [{translateX: DimensionsUtils.getDP(32)}],
  },
  ball: {
    position: 'absolute',
    alignSelf: 'center',
    height: DimensionsUtils.getDP(24),
    width: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(12),
    elevation: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: Colors.fillRed,
    backgroundColor: Colors.fillRed,
  },
  text: {
    color: Colors.black,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
    marginTop: DimensionsUtils.getDP(8),
    fontSize: DimensionsUtils.getFontSize(16),
  },
  spaceVertical: {
    paddingVertical: DimensionsUtils.getDP(16),
  },
});
