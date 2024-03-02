import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SkeletonFriend = ({skeletonStyle, animatedStyle}) => {
  return (
    <View style={skeletonStyle}>
      <View style={styles.row}>
        <Animated.View style={[animatedStyle, styles.avatar]} />
        <View style={styles.spaceLeft}>
          <Animated.View
            style={[animatedStyle, styles.line1, styles.spaceTop]}
          />
          <Animated.View
            style={[animatedStyle, styles.line2, styles.spaceTop]}
          />
        </View>
      </View>
    </View>
  );
};

export default SkeletonFriend;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
    width: DimensionsUtils.getDP(124),
    height: DimensionsUtils.getDP(20),
    backgroundColor: Colors.lightGrey,
  },
  spaceLeft: {
    marginLeft: DimensionsUtils.getDP(8),
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(8),
  },
});
