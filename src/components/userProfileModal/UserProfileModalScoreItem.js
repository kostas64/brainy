import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const UserProfileModalScoreItem = ({item}) => {
  const gameData = item?.data?.[0];

  const score = !gameData
    ? 'No score yet'
    : typeof gameData?.points === 'number'
    ? `${gameData?.points} points\n(${gameData?.correctness}%)`
    : `${gameData?.milliseconds / 1000}s\nin ${gameData?.flips} flips`;

  return (
    <View style={styles.container}>
      <Text style={styles.gameName}>{item.game}</Text>

      <FastImage
        style={styles.gameImg}
        source={GenericUtils.matchGameNameWithImg(item.game)}
      />

      <Text
        style={[
          styles.score,
          !gameData ? styles.spaceTop : styles.smallSpaceTop,
        ]}>
        {score}
      </Text>
    </View>
  );
};

export default UserProfileModalScoreItem;

const styles = StyleSheet.create({
  container: {
    width: 120,
    alignItems: 'center',
  },
  smallSpaceTop: {
    marginTop: DimensionsUtils.getDP(4),
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(12),
  },
  gameName: {
    marginBottom: DimensionsUtils.getDP(4),
    fontSize: DimensionsUtils.getFontSize(12),
    fontFamily: 'Poppins-Medium',
    color: Colors.white,
  },
  gameImg: {
    borderWidth: 1,
    borderColor: Colors.appGreen,
    width: DimensionsUtils.getDP(78),
    height: DimensionsUtils.getDP(78),
    borderRadius: DimensionsUtils.getDP(12),
  },
  score: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(12),
  },
});
