import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {getAdaptedScores} from '../../utils/StringUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ProfileScoresSectionItem = ({item, scores, passedScores}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <Text style={styles.label} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.score}>
        {getAdaptedScores(item.title, scores, passedScores)}
      </Text>
    </View>
  );
};

export default ProfileScoresSectionItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: 80,
    paddingLeft: DimensionsUtils.getDP(12),
    paddingTop: 12,
    paddingBottom: 8,
    marginRight: 16,
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
    fontSize: 13,
  },
});
