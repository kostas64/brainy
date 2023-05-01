import {View, Text} from 'react-native';
import React from 'react';
import BackgroundWrapper from '../components/common/BackgroundWrapper';

const EqualMathScreen = () => {
  return (
    <BackgroundWrapper
      source={require('../assets/images/match_equal_background.jpg')}>
      <Text>EqualMathScreen</Text>
    </BackgroundWrapper>
  );
};

export default EqualMathScreen;
