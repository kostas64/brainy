import React from 'react';

class MathUtils extends React.Component {
  static shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  static getRandom(min, max) {
    // Get the current time in milliseconds and use
    // it as the seed for a pseudo-random number generator
    let seed = Math.random() * new Date().getTime();
    let random = (seed * 9301 + 49297) % 233280;
    let randomNumber = min + (random / 233280) * (max - min);

    return randomNumber;
  }
}

export default MathUtils;
