import dict from '../values/dict.json';

export const GAMES = [
  'Memory Cards',
  'Color Match',
  'Do the math',
  'Gesture It',
];

export const LIST_GAMES = [
  {
    title: dict.memoryCardsGameTitle,
    poster: require('../images/memory_match.png'),
    screen: 'MemoryCard',
    description: 'Match the pairs',
  },
  {
    title: dict.colorMatchGameTitle,
    poster: require('../images/color_match.png'),
    screen: 'ColorCard',
    description: 'Mix up colors and text?',
  },
  {
    title: dict.doTheMathGameTitle,
    poster: require('../images/match_equal.png'),
    screen: 'EqualMath',
    description: 'Test your math skills',
  },
  {
    title: dict.gestureItGameTitle,
    poster: require('../images/gesture_it.png'),
    screen: 'GestureIt',
    description: 'Swipe to the right direction',
  },
];
