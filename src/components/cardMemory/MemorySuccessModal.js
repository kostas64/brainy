import React from 'react';
import {View, Text} from 'react-native';
import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const MemorySuccessModal = ({pad, duration, flipCounter, centiseconds}) => {
  return (
    <View
      style={{
        padding: DimensionsUtils.getDP(12),
        marginHorizontal: DimensionsUtils.getDP(16),
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: DimensionsUtils.getFontSize(22),
          fontFamily: GenericUtils.fontFamily(),
          padding: DimensionsUtils.getDP(4),
          marginBottom: DimensionsUtils.getDP(16),
        }}>
        Bravo !!!
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: DimensionsUtils.getFontSize(22),
          fontFamily: GenericUtils.fontFamily(),
          padding: DimensionsUtils.getDP(4),
        }}>{`Flips : ${flipCounter}`}</Text>
      <Text
        style={{
          color: 'black',
          fontSize: DimensionsUtils.getFontSize(22),
          fontFamily: GenericUtils.fontFamily(),
          padding: DimensionsUtils.getDP(4),
        }}>{`${pad(duration?.minutes())}:${pad(duration?.seconds())}:${pad(
        centiseconds,
      )}`}</Text>
    </View>
  );
};

export default MemorySuccessModal;
