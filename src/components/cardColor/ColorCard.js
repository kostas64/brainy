import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {COLORS} from '../../assets/values/colors';
import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const {width: WIDTH} = Dimensions.get('window');

const ColorCard = ({number1, number2}) => {
  return (
    <View style={styles.cardContainer}>
      <Text
        style={[
          styles.cardLabel,
          {
            color: COLORS[number1]?.value,
          },
        ]}>
        {COLORS[number2]?.color}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ColorCard;
