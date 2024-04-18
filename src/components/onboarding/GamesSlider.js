/* eslint-disable no-shadow */
import React from 'react';
import {StyleSheet} from 'react-native';
import {CrossfadeImage} from 'react-native-crossfade-image';

import images from '../../assets/images/images';

const GamesSlider = () => {
  const [index, setIndex] = React.useState(0);

  const assets = [
    images.memory_trans,
    images.color_trans,
    images.math_trans,
    images.gesture_trans,
    images.balance_trans,
  ];

  const getNextIndex = React.useCallback(
    index => (index === assets.length - 1 ? 0 : index + 1),
    [assets.length],
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex(getNextIndex(index));
    }, 1250);

    return () => clearInterval(interval);
  }, [index, getNextIndex]);

  return (
    <CrossfadeImage
      reverseFade
      duration={350}
      style={styles.img}
      resizeMode="cover"
      source={assets[index]}
    />
  );
};

export default GamesSlider;

const styles = StyleSheet.create({
  img: {
    top: 20,
    width: 200,
    height: 200,
  },
});
