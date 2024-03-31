import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Pagination = ({scrollX, dotsLength}) => {
  const arr = new Array(dotsLength).fill(0);

  return (
    <View style={styles.container}>
      {arr.map((_, index) => {
        const isLast = index !== dotsLength - 1;

        const opacity = scrollX.interpolate({
          inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });

        const scale = scrollX.interpolate({
          inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
          outputRange: [1, 1.25, 1],
          extrapolate: 'clamp',
        });

        return (
          <View key={`pagination-${index}`}>
            <Animated.View
              style={[
                styles.dot,
                styles.lowOpacity,
                isLast && styles.spaceRight,
                {backgroundColor: Colors.tabBarIcon},
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                styles.moveDot,
                isLast && styles.spaceRight,
                {opacity, transform: [{scale}]},
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    bottom: DimensionsUtils.getDP(24),
  },
  dot: {
    width: DimensionsUtils.getDP(8),
    height: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(4),
  },
  moveDot: {
    position: 'absolute',
    elevation: 8,
    shadowColor: Colors.appGreen,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: Colors.appGreen,
  },
  lowOpacity: {
    opacity: 0.5,
  },
  spaceRight: {
    marginRight: DimensionsUtils.getDP(8),
  },
});

export default Pagination;
