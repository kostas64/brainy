import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SkeletonProfile = ({skeletonStyle, animatedStyle}) => {
  const items = new Array(4).fill(0);

  return (
    <View style={skeletonStyle}>
      <View style={styles.itemsCenter}>
        <Animated.View style={[animatedStyle, styles.avatar]} />
        <Animated.View
          style={[animatedStyle, styles.line2, styles.spaceVert]}
        />

        <View style={styles.scoreContainer}>
          {items.map((_, key) => (
            <Animated.View
              key={`score-skeleton-${key}`}
              style={[styles.scoreItem, animatedStyle]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default SkeletonProfile;

const styles = StyleSheet.create({
  itemsCenter: {
    alignItems: 'center',
  },
  avatar: {
    width: DimensionsUtils.getDP(106),
    height: DimensionsUtils.getDP(106),
    borderRadius: DimensionsUtils.getDP(53),
    backgroundColor: Colors.lightGrey,
  },
  line1: {
    borderRadius: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(224),
    height: DimensionsUtils.getDP(20),
    backgroundColor: Colors.lightGrey,
  },
  line2: {
    borderRadius: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(164),
    height: DimensionsUtils.getDP(26),
    backgroundColor: Colors.lightGrey,
  },
  spaceLeft: {
    marginLeft: DimensionsUtils.getDP(8),
  },
  spaceVert: {
    marginTop: DimensionsUtils.getDP(8),
    marginBottom: DimensionsUtils.getDP(16),
  },
  scoreContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  scoreItem: {
    height: 82,
    paddingLeft: DimensionsUtils.getDP(12),
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: Colors.lightGrey,
    width: (WIDTH - 48) / 2,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
});
