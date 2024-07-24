/* eslint-disable react-hooks/exhaustive-deps */
import Animated, {
  runOnJS,
  withSpring,
  SensorType,
  withTiming,
  useSharedValue,
  useDerivedValue,
  cancelAnimation,
  useAnimatedStyle,
  useAnimatedSensor,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import {submitScore} from '../services/score';
import Points from '../components/common/Points';
import {useAuthContext} from '../context/AuthProvider';
import StopWatch from '../components/common/StopWatch';
import {DimensionsUtils} from '../utils/DimensionUtils';
import AnimatedModal from '../components/common/AnimatedModal';
import {HEIGHT, WIDTH, triggerHaptik} from '../utils/GenericUtils';
import NewGameButton from '../components/cardMemory/NewGameButton';
import ProgressCircle from '../components/ballBalance/ProgressCircle';
import BackgroundWrapper from '../components/common/BackgroundWrapper';
import CelebrationLottie from '../components/common/CelebrationLottie';
import BallBalanceTutorial from '../components/ballBalance/BallBalanceTutorial';
import TimePointsSuccessModal from '../components/common/TimePointsSuccessModal';

const BALL_SIZE = 36;
const INIT_HOLE_SIZE = 72;

const BallBalanceScreen = ({route}) => {
  const {user} = useAuthContext();
  const insets = useSafeAreaInsets();
  const rotation = useAnimatedSensor(SensorType.ROTATION);

  //Start ball from center
  const progress = useSharedValue(0);
  const rotY = useSharedValue((WIDTH - 36) / 2);
  const rotX = useSharedValue((HEIGHT - 36) / 2);

  const timeRef = React.useRef();
  const lottieRef = React.useRef();

  const [points, setPoints] = React.useState(0);
  const [tutOpen, setTutOpen] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [holePos, setHolePos] = React.useState({x: 0, y: 0});
  const [holeSize, setHoleSize] = React.useState(INIT_HOLE_SIZE);

  const bottom = {
    bottom:
      insets.bottom > 0
        ? insets.bottom + DimensionsUtils.getDP(96)
        : DimensionsUtils.getDP(96),
  };

  const pad = n => (n < 10 ? '0' + n : n);
  const duration = timeRef?.current?.extractTime();
  const totalMilliseconds =
    duration?.minutes * 60000 +
    duration?.seconds * 1000 +
    duration?.milliseconds;

  //** ----- STYLES -----
  const animBall = useAnimatedStyle(
    () => ({
      transform: [{translateX: rotY.value}, {translateY: rotX.value}],
    }),
    [],
  );

  const holeContainer = {
    position: 'absolute',
    top: holePos.y,
    left: holePos.x,
  };

  //** ----- FUNCTIONS -----
  const generateRandPos = React.useCallback(
    keepPoints => {
      progress.value = 0;
      !keepPoints && setPoints(old => old + 1);
      !keepPoints && holeSize > 38 && setHoleSize(old => old - 2);

      const x = Math.floor(Math.random() * (WIDTH - holeSize));
      const y = Math.floor(Math.random() * (HEIGHT - holeSize));

      setHolePos({x, y});
    },
    [holeSize, progress],
  );

  const successContent = React.useCallback(() => {
    const result = `${pad(duration?.minutes)}:${pad(duration?.seconds)}:${pad(
      duration?.milliseconds,
    )}`;

    return (
      <TimePointsSuccessModal
        time={result}
        points={points}
        label={dict.pointsLabel}
      />
    );
  }, [duration, points]);

  const setNewGame = React.useCallback(() => {
    rotX.value = (HEIGHT - 36) / 2;
    rotY.value = (WIDTH - 36) / 2;
    setPoints(0);
    setGameOver(false);
    setHoleSize(INIT_HOLE_SIZE);
    generateRandPos(true);
    timeRef.current.reset();
    timeRef.current.start();
  }, []);

  const closeModal = React.useCallback(val => {
    timeRef.current.start();
    setTutOpen(val);
  }, []);

  const sendScore = () => {
    submitScore('ball_balance', {
      points,
      milliseconds: totalMilliseconds,
    }).finally(() => route?.params?.update());
  };

  //** ----- EFFECTS -----
  useDerivedValue(() => {
    const {qx, qy} = rotation.sensor.value;

    if (!gameOver && !tutOpen) {
      const ballCenterX = rotY.value + qy * 75 + BALL_SIZE / 2;
      const ballCenterY = rotX.value + qx * 75 + BALL_SIZE / 2;

      rotX.value = withSpring(rotX.value + qx * 75);
      rotY.value = withSpring(rotY.value + qy * 75);

      const holeCenterX = holePos.x + holeSize / 2;
      const holeCenterY = holePos.y + holeSize / 2;

      const distX = ballCenterX - holeCenterX;
      const distY = ballCenterY - holeCenterY;

      //Calculate if its inside based on distance from hole's center
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance <= holeSize / 2 - BALL_SIZE / 2 && progress.value === 0) {
        progress.value = withTiming(1, {duration: 1500}, done => {
          if (done) {
            runOnJS(generateRandPos)();
          }
        });
      } else if (
        ballCenterX < 18 ||
        ballCenterY < 18 ||
        ballCenterX > WIDTH - 18 ||
        ballCenterY > HEIGHT - 18 || //Check if ball is out of bounds
        (distance > holeSize / 2 - BALL_SIZE / 2 &&
          progress.value > 0 &&
          progress.value < 1) //Check if ball was in and after is out of hole
      ) {
        cancelAnimation(progress);
        runOnJS(setGameOver)(true);
        runOnJS(triggerHaptik)();
      }
    }
  }, [tutOpen, holePos, gameOver]);

  React.useEffect(() => {
    generateRandPos(true);
  }, []);

  React.useEffect(() => {
    if (gameOver) {
      timeRef.current.stop();
      setModalOpen(true);
      lottieRef?.current?.play(0, 210);
      !user?.isGuest && sendScore();
    }
  }, [gameOver]);

  return (
    <>
      <BackgroundWrapper statusBar={'light-content'} />
      <BallBalanceTutorial modalOpen={tutOpen} setModalOpen={closeModal} />

      <View
        style={[styles.header, {top: insets.top + DimensionsUtils.getDP(24)}]}>
        <Points points={points} />
        <StopWatch ref={timeRef} />
      </View>

      <View style={holeContainer}>
        <ProgressCircle
          progress={progress}
          strokeWidth={6}
          size={holeSize}
          barColor={Colors.fillRed}
          borderColor={Colors.veryLightGrey}
        />
      </View>

      <Animated.View style={[animBall, styles.ball]} />

      {gameOver && (
        <View style={[styles.playAgainCont, bottom]}>
          <NewGameButton setNewGame={setNewGame} />
        </View>
      )}

      {gameOver && <CelebrationLottie ref={lottieRef} />}
      <AnimatedModal
        gameOver={gameOver}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        content={successContent()}
      />
    </>
  );
};

export default BallBalanceScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: DimensionsUtils.getDP(26),
  },
  ball: {
    position: 'absolute',
    height: BALL_SIZE,
    width: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
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
  playAgainCont: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
