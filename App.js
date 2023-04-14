import React from 'react';
import MathUtils from './src/utils/MathUtils';
import Card from './src/components/cardMemory/Card';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
const values = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'X'];

function App() {
  const [cards, setCards] = React.useState([]);

  const setIsFlipped = index => {
    const tempCards = cards.map((card, i) => {
      if (i !== index) return card;
      return {
        ...card,
        isFlipped: !card.isFlipped,
      };
    });
    setCards(tempCards);
  };

  React.useEffect(() => {
    const newCards = [];
    for (let i = 0; i < 9; i++) {
      const value = values[i];
      const id = i;
      newCards.push({id, value, isFlipped: false});
    }
    setCards(MathUtils.shuffleArray(newCards));
  }, []);

  return (
    <View style={styles.container}>
      {cards.map((card, i) => (
        <Card
          key={i}
          index={i}
          value={card.value}
          isFlipped={card.isFlipped}
          setIsFlipped={i => setIsFlipped(i)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 200,
    marginHorizontal: WIDTH / 16,
  },
});

export default App;
