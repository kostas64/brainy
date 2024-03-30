import React from 'react';

import images from '../images/images';
import dict from '../values/dict.json';
import MathIcon from '../../components/profile/cards/MathIcon';
import ColorIcon from '../../components/profile/cards/ColorIcon';
import MemoryIcon from '../../components/profile/cards/MemoryIcon';
import GestureIcon from '../../components/profile/cards/GestureIcon';
import BallBalanceIcon from '../../components/profile/cards/BallBalanceIcon';

export const GAMES = [
  'Memory Cards',
  'Color Match',
  'Do the math',
  'Gesture It',
  'Ball Balance',
];

export const LIST_GAMES = [
  {
    title: dict.memoryCardsGameTitle,
    poster: images.memoryMatch,
    screen: 'MemoryCard',
    description: 'Match the pairs',
    icon: <MemoryIcon />,
  },
  {
    title: dict.colorMatchGameTitle,
    poster: images.colorMatch,
    screen: 'ColorCard',
    description: 'Mix up colors and text?',
    icon: <ColorIcon />,
  },
  {
    title: dict.doTheMathGameTitle,
    poster: images.matchEqual,
    screen: 'EqualMath',
    description: 'Test your math skills',
    icon: <MathIcon />,
  },
  {
    title: dict.gestureItGameTitle,
    poster: images.gestureIt,
    screen: 'GestureIt',
    description: 'Swipe to the right direction',
    icon: <GestureIcon />,
  },
  {
    title: dict.ballBalanceGameTitle,
    poster: images.ballBalance,
    screen: 'BallBalance',
    description: 'Find the right balance',
    icon: <BallBalanceIcon />,
  },
];
