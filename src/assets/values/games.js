import images from '../images/images';
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
    poster: images.memoryMatch,
    screen: 'MemoryCard',
    description: 'Match the pairs',
  },
  {
    title: dict.colorMatchGameTitle,
    poster: images.colorMatch,
    screen: 'ColorCard',
    description: 'Mix up colors and text?',
  },
  {
    title: dict.doTheMathGameTitle,
    poster: images.matchEqual,
    screen: 'EqualMath',
    description: 'Test your math skills',
  },
  {
    title: dict.gestureItGameTitle,
    poster: images.gestureIt,
    screen: 'GestureIt',
    description: 'Swipe to the right direction',
  },
];
