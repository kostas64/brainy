import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import dict from '../../assets/values/dict.json';
import {useStorage} from '../../hooks/useStorage';
import {LIST_GAMES} from '../../assets/values/games';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ProfileScoresSection = () => {
  const [scores] = useStorage('scores', []);

  return (
    <View style={styles.container}>
      {LIST_GAMES.map((item, index) => {
        const ms = scores[item.title]?.[0]?.milliseconds;
        const points = scores[item.title]?.[0]?.points;
        const scoreLabel = `${`${
          ms
            ? `${ms / 1000}s (${scores[item.title]?.[0]?.flips} flips)`
            : `${points} points (${scores[item.title]?.[0]?.correctness}%)`
        }`}`;
        const score = !!ms || !!points ? scoreLabel : dict?.gamesNoScore;

        return (
          <View key={`game-${index}`} style={styles.itemContainer}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.label} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.score}>{score}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ProfileScoresSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  itemContainer: {
    height: 82,
    paddingLeft: DimensionsUtils.getDP(12),
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: Colors.tabBarBg,
    width: (WIDTH - 48) / 2,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'absolute',
    top: DimensionsUtils.getDP(12),
    right: DimensionsUtils.getDP(10),
  },
  label: {
    lineHeight: 17,
    color: Colors.appGreen,
    fontFamily: 'Poppins-Bold',
    width: (WIDTH - 156) / 2,
  },
  score: {
    justifyContent: 'space-between',
    color: Colors.halfWhite,
    fontFamily: 'Poppins-Regular',
  },
});
