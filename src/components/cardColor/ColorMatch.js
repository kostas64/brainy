import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ColorCard from './ColorCard';
import Timer from '../common/Timer';
import ColorButton from './ColorButton';
import ColorPoints from './ColorPoints';
import MathUtils from '../../utils/MathUtils';
import CardSuccessModal from './CardSuccessModal';
import {COLORS} from '../../assets/values/colors';
import AnimatedModal from '../common/AnimatedModal';
import {GenericUtils} from '../../utils/GenericUtils';
import NewGameButton from '../cardMemory/NewGameButton';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import BackgroundWrapper from '../common/BackgroundWrapper';

const {width: WIDTH} = Dimensions.get('window');

const BottomButton = ({label, onPress, disabled}) => {
  const insets = useSafeAreaInsets();

  return (
    <ColorButton
      disabled={disabled}
      label={label}
      onPress={onPress}
      insets={insets}
    />
  );
};

const ColorMatch = () => {
  const insets = useSafeAreaInsets();
  const timeRef = React.useRef();

  const [rand1, setRand1] = React.useState();
  const [rand2, setRand2] = React.useState();
  const [rand3, setRand3] = React.useState();
  const [rand4, setRand4] = React.useState();
  const [tries, setTries] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [points, setPoints] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  const checkValid = answer => {
    if (
      (COLORS[rand2]?.color === COLORS[rand3]?.color && answer === 'yes') ||
      (COLORS[rand2]?.color !== COLORS[rand3]?.color && answer === 'no')
    ) {
      setPoints(oldPoints => oldPoints + 1);
      setCorrect(oldCorrect => oldCorrect + 1);
    } else {
      setPoints(oldPoints => (oldPoints - 3 > 0 ? oldPoints - 3 : 0));
    }
    setTries(oldTries => oldTries + 1);
  };

  const generateRandoms = () => {
    setRand1(Math.floor(MathUtils.getRandom(0, COLORS.length)));
    setRand2(Math.floor(MathUtils.getRandom(0, COLORS.length)));
    setRand3(Math.floor(MathUtils.getRandom(0, COLORS.length)));
    setRand4(Math.floor(MathUtils.getRandom(0, COLORS.length)));
  };

  const successContent = () => (
    <CardSuccessModal tries={tries} correct={correct} points={points} />
  );

  const setNewGame = () => {
    setTries(0);
    setCorrect(0);
    setPoints(0);
    setIsFinished(false);
    generateRandoms();
    timeRef.current?.resetTime();
  };

  React.useEffect(() => {
    generateRandoms();
  }, []);

  return (
    <BackgroundWrapper
      statusBar={'dark-content'}
      source={require('../../assets/images/color_match_background.jpg')}>
      <View style={styles.container}>
        <ColorPoints
          correct={correct}
          tries={tries}
          points={points}
          insets={insets}
        />
        <View style={[styles.watchContainer, {top: insets.top + 24}]}>
          <Timer
            ref={timeRef}
            seconds={30}
            setIsFinished={() => {
              setModalOpen(true);
              setIsFinished(true);
            }}
          />
        </View>
        <ColorCard number1={rand1} number2={rand2} />
        <View style={{marginVertical: DimensionsUtils.getDP(8)}} />
        <ColorCard number1={rand3} number2={rand4} />
      </View>
      <View style={styles.bottomContainer}>
        <BottomButton
          label={'NO'}
          disabled={isFinished}
          onPress={() => {
            if (!timeRef.current.isRunning) {
              timeRef.current.start();
            }
            checkValid('no');
            generateRandoms();
          }}
        />
        <BottomButton
          label={'YES'}
          disabled={isFinished}
          onPress={() => {
            if (!timeRef.current.isRunning) {
              timeRef.current.start();
            }
            checkValid('yes');
            generateRandoms();
          }}
        />
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
  watchContainer: {
    position: 'absolute',
    right: DimensionsUtils.getDP(WIDTH / 16),
  },
  bottomContainer: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
  },
  buttonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DimensionsUtils.getDP(8),
    marginHorizontal: DimensionsUtils.getDP(16),
    width: WIDTH / 2 - DimensionsUtils.getDP(32),
  },
  buttonLabel: {
    color: 'black',
    fontFamily: GenericUtils.fontFamily(),
    fontSize: DimensionsUtils.getFontSize(24),
  },
  playAgainCont: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default ColorMatch;
