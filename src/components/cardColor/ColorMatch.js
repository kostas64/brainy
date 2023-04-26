import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, Dimensions, StyleSheet, Pressable} from 'react-native';

import MathUtils from '../../utils/MathUtils';
import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import BackgroundWrapper from '../common/BackgroundWrapper';

const {width: WIDTH} = Dimensions.get('window');
const values = [
  {color: 'red', value: 'crimson'},
  {color: 'blue', value: 'dodgerblue'},
  {color: 'green', value: 'forestgreen'},
  {color: 'yellow', value: 'gold'},
  {color: 'grey', value: 'grey'},
  {color: 'pink', value: 'hotpink'},
  {color: 'brown', value: 'saddlebrown'},
  {color: 'black', value: 'black'},
  {color: 'orange', value: 'darkorange'},
];

const Card = () => {
  const rand1 = Math.floor(MathUtils.getRandom(0, values.length));
  const rand2 = Math.floor(MathUtils.getRandom(0, values.length));

  return (
    <View style={styles.cardContainer}>
      <Text
        style={[
          styles.cardLabel,
          {
            color: values[rand1].value,
          },
        ]}>
        {values[rand2].color}
      </Text>
    </View>
  );
};

const BottomButton = ({label}) => {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      style={[
        styles.buttonContainer,
        {
          marginBottom:
            insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(16),
          height:
            insets.bottom > 0
              ? DimensionsUtils.getDP(32) + insets.bottom
              : DimensionsUtils.getDP(32),
        },
      ]}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
};

const ColorMatch = () => {
  return (
    <BackgroundWrapper
      statusBar={'light-content'}
      source={require('../../assets/images/background2.png')}>
      <View style={styles.container}>
        <Card />
        <View style={{marginVertical: DimensionsUtils.getDP(8)}} />
        <Card />
      </View>
      <View style={styles.bottomContainer}>
        <BottomButton label={'NO'} />
        <BottomButton label={'YES'} />
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: DimensionsUtils.getDP(50),
    width: WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  cardLabel: {
    fontFamily: GenericUtils.fontFamily(),
    fontSize: DimensionsUtils.getFontSize(32),
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
});

export default ColorMatch;
