import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import MathUtils from '../utils/MathUtils';
import dict from '../assets/values/dict.json';
import Card from '../components/cardMemory/Card';
import MemoryValues from '../assets/values/memory';
import StopWatch from '../components/common/StopWatch';
import {DimensionsUtils} from '../utils/DimensionUtils';
import AnimatedModal from '../components/common/AnimatedModal';
import NewGameButton from '../components/cardMemory/NewGameButton';
import CelebrationLottie from '../components/common/CelebrationLottie';
import BackgroundWrapper from '../components/common/BackgroundWrapper';
import MemorySuccessModal from '../components/cardMemory/MemorySuccessModal';
import CardMemoryTutorial from '../components/cardMemory/CardMemoryTutorial';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

const MemoryCardScreen = () => {
  const insets = useSafeAreaInsets();

  const lottieRef = React.useRef();
  const timeRef = React.useRef();
  const childRefs = React.useRef([]);
  const [tutOpen, setTutOpen] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [flipCounter, setFlipCounter] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [currentFlipped, setCurrentFlipped] = React.useState([]);
  const [cardsDisabled, setCardsDisabled] = React.useState(false);

  const setIsFlipped = index => {
    //Keep flipped cards
    const tempCards = cards.map((card, i) => {
      if (i !== index) return card;

      if (i === index) {
        const cardToPush = {
          ...card,
          isFlipped: !card.isFlipped,
        };
        setCurrentFlipped(curF => [...curF, cardToPush]);

        return cardToPush;
      }
    });

    setCards(tempCards);
  };

  const isGameOver = () => {
    const sum = cards.reduce((acc, cur) => acc + (!!cur.isMatched ? 1 : 0), 0);
    if (sum === MemoryValues.length - 1 || sum === MemoryValues.length) {
      setCardsDisabled(true);
      return true;
    } else {
      setCardsDisabled(false);
      return false;
    }
  };

  const setNewGame = () => {
    setCards([]);
    setFlipCounter(0);
    setCurrentFlipped([]);
    setCardsDisabled(false);
    setGameOver(false);
    timeRef.current.stop();
    timeRef.current.reset();
  };

  const successContent = () => {
    const pad = n => (n < 10 ? '0' + n : n);
    const duration = timeRef?.current?.extractTime();
    const centiseconds = Math.floor(duration?.milliseconds() / 10);

    return (
      <MemorySuccessModal
        pad={pad}
        duration={duration}
        flipCounter={flipCounter}
        centiseconds={centiseconds}
      />
    );
  };

  React.useEffect(() => {
    if (cards.length === 0) {
      let newCards = [];
      //Fill cards
      for (let i = 0; i < 16; i++) {
        const value = MemoryValues[i];
        newCards.push({value, isFlipped: false, isMatched: false});
      }

      //Shuffle and fill with id
      newCards = MathUtils.shuffleArray(newCards);
      newCards = newCards.map((card, i) => ({
        ...card,
        id: i,
      }));

      setCards(newCards);
    }
  }, [cards]);

  React.useEffect(() => {
    if (isGameOver()) {
      //Stop timer
      timeRef.current.stop();
      setGameOver(true);
      setModalOpen(true);
    } else {
      const sumFlipped = cards.reduce(
        (acc, cur) => acc + (!!cur.isFlipped ? 1 : 0),
        0,
      );

      if (sumFlipped > 0 && timeRef.current.isRunning === false) {
        //Start timer
        timeRef.current.start();
      }
      setGameOver(false);
    }
  }, [cards]);

  React.useEffect(() => {
    gameOver && lottieRef?.current?.play(0, 210);
  }, [gameOver]);

  React.useEffect(() => {
    const flippedEqual =
      currentFlipped?.[0]?.value === currentFlipped?.[1]?.value;

    //Check if cards match and flip back if not
    if (currentFlipped.length === 2 && !flippedEqual) {
      setFlipCounter(oldCounter => oldCounter + 1);
      setCardsDisabled(true);
      setTimeout(() => {
        childRefs.current?.[currentFlipped[0]?.id]?.flipToBack();
        childRefs.current?.[currentFlipped[1]?.id]?.flipToBack();
        setCurrentFlipped([]);
        setCardsDisabled(false);
      }, 500);
    } else if (currentFlipped.length === 2 && flippedEqual) {
      setFlipCounter(oldCounter => oldCounter + 1);

      //Keep cards that match
      setCards(
        cards.map(card => {
          if (
            card.id === currentFlipped?.[0]?.id ||
            card.id === currentFlipped?.[1]?.id
          ) {
            return {
              ...card,
              isMatched: true,
            };
          } else {
            return card;
          }
        }),
      );
      setCurrentFlipped([]);
    }
  }, [currentFlipped]);

  return (
    <>
      <BackgroundWrapper
        statusBar={'light-content'}
        source={require('../assets/images/memory_background.jpg')}
      />
      <CardMemoryTutorial modalOpen={tutOpen} setModalOpen={setTutOpen} />
      <View style={[styles.watchContainer, {top: insets.top + 24}]}>
        <StopWatch ref={timeRef} />
      </View>
      <View
        style={[
          styles.flipContainer,
          {
            top: insets.top + 24,
          },
        ]}>
        <Text
          style={
            styles.flipLabel
          }>{`${dict.memoryCardFlipLabel}: ${flipCounter}`}</Text>
      </View>
      <View style={styles.board}>
        {cards.map((card, i) => (
          <Card
            key={i}
            index={i}
            ref={ref => (childRefs.current[i] = ref)}
            value={card.value}
            cardsDisabled={cardsDisabled}
            isFlipped={card.isFlipped}
            setIsFlipped={i => setIsFlipped(i)}
          />
        ))}
      </View>
      {gameOver && <CelebrationLottie ref={lottieRef} />}
      <AnimatedModal
        gameOver={gameOver}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        content={successContent()}
      />
      <View
        style={[
          styles.newGameCont,
          {
            bottom: insets.bottom > 0 ? insets.bottom : 24,
          },
        ]}>
        <NewGameButton gameFinished={gameOver} setNewGame={setNewGame} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  watchContainer: {
    position: 'absolute',
    right: DimensionsUtils.getDP(WIDTH / 16),
  },
  board: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DimensionsUtils.getDP(
      (HEIGHT - (3 * WIDTH) / 4 - (3 * WIDTH) / 16) / 2,
    ),
    marginHorizontal: DimensionsUtils.getDP(WIDTH / 16),
    zIndex: 100,
  },
  flipContainer: {
    position: 'absolute',
    left: DimensionsUtils.getDP(26),
    padding: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(112),
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  flipLabel: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
  },
  newGameCont: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default MemoryCardScreen;
