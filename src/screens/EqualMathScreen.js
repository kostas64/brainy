import React from 'react';
import {evaluate} from 'mathjs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';

import {Colors} from '../utils/Colors';
import {DimensionsUtils} from '../utils/DimensionUtils';
import CountdownTimer from '../components/common/Timer';
import EqualButton from '../components/equalMath/EqualButton';
import AnimatedModal from '../components/common/AnimatedModal';
import NewGameButton from '../components/cardMemory/NewGameButton';
import EqualMathModal from '../components/equalMath/EqualMathModal';
import BackgroundWrapper from '../components/common/BackgroundWrapper';
import CelebrationLottie from '../components/common/CelebrationLottie';

const {width: WIDTH} = Dimensions.get('window');

const Card = ({onPress, equation, disabled}) => {
  return (
    <Pressable
      style={styles.cardContainer}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.cardLabel}>{equation}</Text>
    </Pressable>
  );
};

const EqualMathScreen = () => {
  const insets = useSafeAreaInsets();
  const timeRef = React.useRef();
  const lottieRef = React.useRef();
  const [points, setPoints] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  const [number1, setNumber1] = React.useState();
  const [number2, setNumber2] = React.useState();
  const [number3, setNumber3] = React.useState();
  const [number4, setNumber4] = React.useState();
  const [number5, setNumber5] = React.useState();
  const [number6, setNumber6] = React.useState();
  const [question, setQuestion] = React.useState(0);

  const onCardPress = (firstCardPressed, isEqual = false) => {
    if (!timeRef.current.isRunning) {
      timeRef.current.start();
    }

    const isCorrect = isEqual
      ? evaluate(equationEasyMed1.replace('X', '*')) ==
        evaluate(equationEasyMed2.replace('X', '*'))
      : firstCardPressed
      ? evaluate(equationEasyMed1.replace('X', '*')) >
        evaluate(equationEasyMed2.replace('X', '*'))
      : evaluate(equationEasyMed1.replace('X', '*')) <
        evaluate(equationEasyMed2.replace('X', '*'));
    isCorrect && setCorrect(oldCorrect => oldCorrect + 1);
    isCorrect && setPoints(oldPoints => oldPoints + 2);
    !isCorrect && setPoints(oldPoints => (oldPoints >= 3 ? oldPoints - 3 : 0));
    setQuestion(oldQuestion => oldQuestion + 1);
  };

  const generateRandoms = () => {
    setNumber1(Math.floor(Math.random() * 9) + 1);
    setNumber2(Math.floor(Math.random() * 9) + 1);
    question >= 10 && setNumber3(Math.floor(Math.random() * 9) + 1);
    setNumber4(Math.floor(Math.random() * 9) + 1);
    setNumber5(Math.floor(Math.random() * 9) + 1);
    question >= 10 && setNumber6(Math.floor(Math.random() * 9) + 1);
  };

  const generateOperators = () => {
    const posibility1 = question <= 5 ? 0.5 : question <= 10 ? 0 : 0.1;
    const posibility2 = question <= 5 ? 1 : question <= 0.7 ? 0 : 0.2;
    const posibility3 = question <= 5 ? null : question <= 10 ? 0.5 : 0.6;

    return Math.random() < posibility1
      ? '+'
      : Math.random() < posibility2
      ? '-'
      : Math.random() < posibility3
      ? 'X'
      : '/';
  };

  const generateEquationEasy = (number1, number2) => {
    return `${number1} ${generateOperators()} ${number2}`;
  };

  const setNewGame = () => {
    setCorrect(0);
    setQuestion(0);
    setIsFinished(false);
    timeRef.current?.resetTime();
  };

  const successContent = () => (
    <EqualMathModal correct={correct} total={question} points={points} />
  );

  React.useEffect(() => {
    generateRandoms();
  }, [question]);

  React.useEffect(() => {
    isFinished && lottieRef?.current?.play(0, 210);
  }, [isFinished]);

  const equationEasyMed1 = generateEquationEasy(number1, number2);
  const equationEasyMed2 = generateEquationEasy(number4, number5);

  const equationDiff1 =
    Math.random() < 0.5
      ? `(${equationEasyMed1}) ${generateOperators()} ${number3}`
      : `${number1} ${generateOperators()} (${number2} ${generateOperators()} ${number3})`;

  const equationDiff2 =
    Math.random() < 0.5
      ? `(${equationEasyMed2}) ${generateOperators()} ${number3}`
      : `${number4} ${generateOperators()} (${number5} ${generateOperators()} ${number6})`;

  return (
    <BackgroundWrapper
      statusBar={'light-content'}
      source={require('../assets/images/match_equal_background.jpg')}>
      <View style={styles.container}>
        <View
          style={[
            styles.counterContainer,
            {
              top: insets.top + 24,
            },
          ]}>
          <Text style={styles.counterLabel}>{`Points: ${points}`}</Text>
          <Text style={styles.counterLabel}>{`${correct}/${question}`}</Text>
        </View>
        <View style={[styles.watchContainer, {top: insets.top + 24}]}>
          <CountdownTimer
            ref={timeRef}
            seconds={30}
            setIsFinished={() => {
              setModalOpen(true);
              setIsFinished(true);
            }}
          />
        </View>
        <Card
          card={1}
          question={question}
          disabled={isFinished}
          onPress={() => onCardPress(true)}
          equation={question <= 10 ? equationEasyMed1 : equationDiff1}
        />
        <View style={{marginVertical: DimensionsUtils.getDP(8)}} />
        <Card
          card={2}
          question={question}
          disabled={isFinished}
          onPress={() => onCardPress(false)}
          generateOperators={generateOperators}
          equation={question <= 10 ? equationEasyMed2 : equationDiff2}
        />
        <View
          style={{
            bottom: 0,
            position: 'absolute',
          }}>
          <EqualButton
            label={'Equal'}
            insets={insets}
            disabled={isFinished}
            onPress={() => onCardPress(false, true)}
          />
        </View>
      </View>
      {isFinished && (
        <View
          style={[
            styles.playAgainCont,
            {
              bottom:
                insets.bottom > 0
                  ? insets.bottom + DimensionsUtils.getDP(96)
                  : DimensionsUtils.getDP(96),
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
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    position: 'absolute',
    left: DimensionsUtils.getDP(26),
    padding: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(124),
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  counterLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
  watchContainer: {
    position: 'absolute',
    right: DimensionsUtils.getDP(WIDTH / 16),
  },
  cardContainer: {
    height: DimensionsUtils.getDP(50),
    width: WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: DimensionsUtils.getDP(8),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  cardLabel: {
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(26),
  },

  playAgainCont: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default EqualMathScreen;
