import React from 'react';
import Card from './Card';
import NewGameButton from './NewGameButton';
import StopWatch from '../common/StopWatch';
import MathUtils from '../../utils/MathUtils';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const values = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'X'];

const MemoryBoard = () => {
  const insets = useSafeAreaInsets();

  const timeRef = React.useRef();
  const childRefs = React.useRef([]);
  const [cards, setCards] = React.useState([]);
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
    if (sum === values.length - 1 || sum === values.length) {
      setCardsDisabled(true);
      return true;
    } else {
      setCardsDisabled(false);
      return false;
    }
  };

  const setNewGame = () => {
    setCards([]);
    setCurrentFlipped([]);
    setCardsDisabled(false);
    setGameOver(false);
  };

  React.useEffect(() => {
    if (cards.length === 0) {
      let newCards = [];
      //Fill cards
      for (let i = 0; i < 9; i++) {
        const value = values[i];
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
    const flippedEqual =
      currentFlipped?.[0]?.value === currentFlipped?.[1]?.value;

    //Check if cards match and flip back if not
    if (currentFlipped.length === 2 && !flippedEqual) {
      setCardsDisabled(true);
      setTimeout(() => {
        childRefs.current?.[currentFlipped[0]?.id]?.flipToBack();
        childRefs.current?.[currentFlipped[1]?.id]?.flipToBack();
        setCurrentFlipped([]);
        setCardsDisabled(false);
      }, 500);
    } else if (currentFlipped.length === 2 && flippedEqual) {
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

  console.log('Watch ref', timeRef.current);

  return (
    <>
      <View
        style={{position: 'absolute', right: WIDTH / 16, top: insets.top + 24}}>
        <StopWatch ref={timeRef} />
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
      {gameOver && <Text style={styles.label}>GAME OVER</Text>}
      <NewGameButton setNewGame={setNewGame} />
    </>
  );
};

const styles = StyleSheet.create({
  board: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: (HEIGHT - (3 * WIDTH) / 4 - (3 * WIDTH) / 16) / 2,
    marginHorizontal: WIDTH / 16,
  },
  label: {
    fontSize: 24,
    fontWeight: '900',
    color: 'black',
    alignSelf: 'center',
  },
});

export default MemoryBoard;
