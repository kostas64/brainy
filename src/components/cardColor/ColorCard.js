import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../../utils/Colors';
import {COLORS} from '../../assets/values/colors';
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
    backgroundColor: Colors.white,
    borderRadius: DimensionsUtils.getDP(8),
  },
  cardLabel: {
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(32),
  },
});

export default ColorCard;
