/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {getRandom} from '../utils/MathUtils';
import {submitScore} from '../services/score';
import dict from '../assets/values/dict.json';
import {COLORS} from '../assets/values/colors';
import Points from '../components/common/Points';
import useBackAction from '../hooks/useBackAction';
import {useAuthContext} from '../context/AuthProvider';
import CountdownTimer from '../components/common/Timer';
import {DimensionsUtils} from '../utils/DimensionUtils';
import HomeButton from '../components/common/HomeButton';
import ColorCard from '../components/cardColor/ColorCard';
import {WIDTH, triggerHaptik} from '../utils/GenericUtils';
import ColorButton from '../components/cardColor/ColorButton';
import AnimatedModal from '../components/common/AnimatedModal';
import AnimatedAnswer from '../components/common/AnimatedAnswer';
import NewGameButton from '../components/cardMemory/NewGameButton';
import BackgroundWrapper from '../components/common/BackgroundWrapper';
import CelebrationLottie from '../components/common/CelebrationLottie';
import CardSuccessModal from '../components/cardColor/CardSuccessModal';
import CardColorTutorial from '../components/cardColor/CardColorTutorial';

const BottomButton = ({
  label,
  onPress,
  disabled,
  labelStyle,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ColorButton
      label={label}
      insets={insets}
      onPress={onPress}
      disabled={disabled}
      labelStyle={labelStyle}
      containerStyle={containerStyle}
    />
  );
};

const ColorCardScreen = ({route}) => {
  const insets = useSafeAreaInsets();

  const timeRef = React.useRef();
  const lottieRef = React.useRef();
  const animAnswerRef = React.useRef();

  const {user} = useAuthContext();

  const [rand1, setRand1] = React.useState();
  const [rand2, setRand2] = React.useState();
  const [rand3, setRand3] = React.useState();
  const [rand4, setRand4] = React.useState();
  const [tries, setTries] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [points, setPoints] = React.useState(0);
  const [tutOpen, setTutOpen] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  const bottom =
    insets.bottom > 0
      ? {bottom: insets.bottom}
      : {bottom: DimensionsUtils.getDP(24)};

  //** ----- FUNCTIONS -----
  const checkValid = React.useCallback(
    answer => {
      if (
        (COLORS[rand2]?.color === COLORS[rand3]?.color && answer === 'yes') ||
        (COLORS[rand2]?.color !== COLORS[rand3]?.color && answer === 'no')
      ) {
        animAnswerRef.current.animateAnswer(true);
        setPoints(oldPoints => oldPoints + 1);
        setCorrect(oldCorrect => oldCorrect + 1);
      } else {
        animAnswerRef.current.animateAnswer(false);
        triggerHaptik();
        setPoints(oldPoints => (oldPoints - 3 > 0 ? oldPoints - 3 : 0));
      }
      setTries(oldTries => oldTries + 1);
    },
    [rand2, rand3],
  );

  const generateRandoms = () => {
    setRand1(Math.floor(getRandom(0, COLORS.length)));
    setRand2(Math.floor(getRandom(0, COLORS.length)));
    setRand3(Math.floor(getRandom(0, COLORS.length)));
    setRand4(Math.floor(getRandom(0, COLORS.length)));
  };

  const successContent = () => (
    <CardSuccessModal tries={tries} correct={correct} points={points} />
  );

  const sendScore = () =>
    submitScore('color_cards', {
      points,
      correctness: Math.floor((correct / tries) * 100),
    }).finally(() => route?.params?.update());

  const setNewGame = () => {
    setTries(0);
    setCorrect(0);
    setPoints(0);
    setIsFinished(false);
    generateRandoms();
    timeRef.current?.resetTime();
  };

  const onPressBtn = React.useCallback(
    value => {
      if (!timeRef.current.isRunning) {
        timeRef.current.start();
      }

      checkValid(value);
      generateRandoms();
    },
    [checkValid],
  );

  //** ----- EFFECTS -----
  useBackAction(() => {
    if (tutOpen) {
      setTutOpen(false);
      return true;
    }
  });

  React.useEffect(() => {
    generateRandoms();
  }, []);

  React.useEffect(() => {
    if (isFinished) {
      lottieRef?.current?.play(0, 210);
      !user?.isGuest && sendScore();
    }
  }, [isFinished]);

  return (
    <>
      <BackgroundWrapper statusBar={'light-content'} />
      <CardColorTutorial modalOpen={tutOpen} setModalOpen={setTutOpen} />
      <View
        style={[styles.header, {top: insets.top + DimensionsUtils.getDP(24)}]}>
        <Points points={points} />
        <AnimatedAnswer ref={animAnswerRef} />
        <CountdownTimer
          ref={timeRef}
          seconds={30}
          setIsFinished={() => {
            setModalOpen(true);
            setIsFinished(true);
          }}
        />
      </View>

      <View style={[styles.container, {top: -insets.top}]}>
        <ColorCard number1={rand1} number2={rand2} />
        <View style={{marginVertical: DimensionsUtils.getDP(8)}} />
        <ColorCard number1={rand3} number2={rand4} />
      </View>

      {!isFinished && (
        <View style={styles.bottomContainer}>
          <BottomButton
            label={dict.noLabel}
            disabled={isFinished}
            onPress={() => onPressBtn(dict.noLabel.toLowerCase())}
          />
          <BottomButton
            label={dict.yesLabel}
            disabled={isFinished}
            labelStyle={styles.positiveBtn}
            containerStyle={styles.positiveBtnBg}
            onPress={() => onPressBtn(dict.yesLabel.toLowerCase())}
          />
        </View>
      )}

      {isFinished && (
        <>
          <View style={[styles.playAgainCont, bottom]}>
            <NewGameButton setNewGame={setNewGame} />
          </View>
          <View style={[bottom, styles.homeBtn]}>
            <HomeButton />
          </View>
        </>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: DimensionsUtils.getDP(26),
  },
  cardsBg: {
    opacity: 0.5,
    borderRadius: DimensionsUtils.getDP(12),
    backgroundColor: Colors.background,
    position: 'absolute',
    width: (WIDTH + DimensionsUtils.getDP(48)) / 2,
    height: DimensionsUtils.getDP(148),
  },
  bottomContainer: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
  playAgainCont: {
    position: 'absolute',
    alignSelf: 'center',
  },
  positiveBtnBg: {
    backgroundColor: Colors.white,
  },
  positiveBtn: {
    color: Colors.tabBarBg,
  },
  homeBtn: {
    position: 'absolute',
    right: DimensionsUtils.getDP(16),
  },
});

export default ColorCardScreen;
