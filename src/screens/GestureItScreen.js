import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import Points from '../components/common/Points';
import {GenericUtils} from '../utils/GenericUtils';
import {DimensionsUtils} from '../utils/DimensionUtils';
import CountdownTimer from '../components/common/Timer';
import {GEST_DESIGNS} from '../assets/values/gestDesignes';
import AnimatedModal from '../components/common/AnimatedModal';
import NewGameButton from '../components/cardMemory/NewGameButton';
import BackgroundWrapper from '../components/common/BackgroundWrapper';
import CelebrationLottie from '../components/common/CelebrationLottie';
import CardSuccessModal from '../components/cardColor/CardSuccessModal';
import GestureItTutorial from '../components/gestureIt/GestureItTutorial';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const GestureItScreen = () => {
  const insets = useSafeAreaInsets();
  const timeRef = React.useRef();
  const swipeRef = React.useRef();
  const lottieRef = React.useRef();

  const [tries, setTries] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [points, setPoints] = React.useState(0);
  const [tutOpen, setTutOpen] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  const [desPos, setDesPos] = React.useState({
    left: 0,
    top: 0,
  });
  const [currentDesign, setCurrentDesign] = React.useState(null);
  const [designs, setDesigns] = React.useState(
    GEST_DESIGNS?.map((_, index) => index),
  );

  const HOR_PADD = DimensionsUtils.getDP(56);
  const VER_PADD = insets.top + insets.bottom;
  const MAX_DES_WIDTH = DimensionsUtils.getDP(168);
  const MAX_DES_HEIGHT = DimensionsUtils.getDP(264);
  const availableWidth = WIDTH - MAX_DES_WIDTH - HOR_PADD;
  const availableHeight = HEIGHT - MAX_DES_HEIGHT - VER_PADD;

  const successContent = () => (
    <CardSuccessModal correct={correct} points={points} tries={tries} />
  );

  const setNewGame = () => {
    setTries(0);
    setCorrect(0);
    setPoints(0);
    setIsFinished(false);
    timeRef.current?.resetTime();
    generateNext();
  };

  const generatePosition = () => {
    setDesPos({
      left: GenericUtils.isIos()
        ? Math.floor(Math.random() * availableWidth)
        : DimensionsUtils.getDP(
            Math.floor(Math.random() * availableWidth) + 30,
          ),
      top: DimensionsUtils.getDP(Math.floor(Math.random() * availableHeight)),
    });
  };

  const swipeHandler = e => {
    if (!timeRef.current.isRunning) {
      timeRef.current.start();
    }

    const event = e.nativeEvent;
    if (event.oldState === State.ACTIVE && event.state === State.END) {
      if (
        Math.abs(event.translationX) > Math.abs(event.translationY) &&
        event.translationX > 0
      ) {
        statsHandler('RIGHT');
      } else if (
        Math.abs(event.translationX) > Math.abs(event.translationY) &&
        event.translationX < 0
      ) {
        statsHandler('LEFT');
      } else if (
        event.translationY > 0 &&
        event.translationY > Math.abs(event.translationX)
      ) {
        statsHandler('DOWN');
      } else if (
        event.translationY < 0 &&
        Math.abs(event.translationY) > Math.abs(event.translationX)
      ) {
        statsHandler('UP');
      }
    }
  };

  const statsHandler = direction => {
    if (currentDesign?.designDirection === direction) {
      setCorrect(oldCorrect => oldCorrect + 1);
      setPoints(oldPoints => oldPoints + 1);
    }

    setTries(oldTries => oldTries + 1);
    generateNext();
  };

  const generateNext = () => {
    const arrayLen = designs.length;
    const randIndex = Math.floor(Math.random() * arrayLen);

    generatePosition();
    setCurrentDesign(GEST_DESIGNS[designs[randIndex]]);
  };

  React.useEffect(() => {
    generateNext();
  }, []);

  React.useEffect(() => {
    isFinished && setDesigns(GEST_DESIGNS?.map((_, index) => index));
    isFinished && lottieRef?.current?.play(0, 210);
  }, [isFinished]);

  return (
    <>
      <BackgroundWrapper
        statusBar={'light-content'}
        source={require('../assets/images/gesture_background.jpg')}
      />
      <GestureItTutorial modalOpen={tutOpen} setModalOpen={setTutOpen} />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + DimensionsUtils.getDP(86),
            paddingBottom: insets.bottom,
          },
        ]}>
        <Points points={points} insets={insets} />
        <View
          style={[
            styles.timer,
            {
              top: insets.top + 24,
            },
          ]}>
          <CountdownTimer
            ref={timeRef}
            seconds={45}
            setIsFinished={() => {
              setModalOpen(true);
              setIsFinished(true);
            }}
          />
        </View>
        <PanGestureHandler ref={swipeRef} onHandlerStateChange={swipeHandler}>
          <View
            style={{
              flex: 1,
              marginBottom: insets.bottom === 0 ? DimensionsUtils.getDP(16) : 0,
            }}>
            <View
              style={{
                position: 'absolute',
                top: desPos?.top || 0,
                left: desPos?.left || 0,
              }}>
              {currentDesign?.design}
            </View>
          </View>
        </PanGestureHandler>
      </View>
      {isFinished && (
        <View
          style={[
            {position: 'absolute', alignSelf: 'center'},
            {
              bottom: insets.bottom > 0 ? insets.bottom : 24,
            },
          ]}>
          <NewGameButton gameFinished={isFinished} setNewGame={setNewGame} />
        </View>
      )}
      {isFinished && <CelebrationLottie ref={lottieRef} />}
      <AnimatedModal
        gameOver={isFinished}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        content={successContent()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DimensionsUtils.getDP(28),
  },
  timer: {
    position: 'absolute',
    right: DimensionsUtils.getDP(26),
  },
  image: {
    width: DimensionsUtils.getDP(28),
    height: DimensionsUtils.getDP(28),
  },
  horSpace: {
    marginHorizontal: DimensionsUtils.getDP(2),
  },
  verSpace: {
    marginVertical: DimensionsUtils.getDP(4),
  },
});

export default GestureItScreen;
