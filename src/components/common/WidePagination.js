import React from 'react';
import {StyleSheet, View} from 'react-native';

import WidePaginationDot from './WidePaginationDot';

const WidePagination = ({x, width, steps, color, containerStyle}) => {
  const dotSteps = new Array(steps)?.fill(0);

  return (
    <View style={[styles.row, containerStyle]}>
      {dotSteps?.map((_, index) => (
        <WidePaginationDot
          x={x}
          key={index}
          index={index}
          color={color}
          frameWidth={width}
          isLast={index === dotSteps.length - 1}
        />
      ))}
    </View>
  );
};

export default WidePagination;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
