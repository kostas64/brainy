import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, Pressable, StyleSheet, FlatList} from 'react-native';

import {Colors} from '../../utils/Colors';
import {GAMES} from '../../assets/values/games';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const InputDropdown = ({value, setValue, isFocused, onFieldPress}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const height = useSharedValue(0); //value is shared between worker threads
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value, //change the height property of the component
    };
  });

  const toggleListItem = () => {
    !!onFieldPress && onFieldPress();

    if (isOpen) {
      height.value = withTiming(0);
    } else {
      height.value = withTiming(DimensionsUtils.getDP(200));
    }

    setIsOpen(open => !open);
  };

  const renderItem = ({item, index}) => {
    const isSelected = value === GAMES[index];
    return (
      <Pressable
        onPress={() => setValue(GAMES[index])}
        style={[
          styles.listItemContainer,
          isSelected && {backgroundColor: Colors.appGreen},
        ]}>
        <Text style={isSelected ? styles.boldText : styles.regText}>
          {item}
        </Text>
      </Pressable>
    );
  };

  React.useEffect(() => {
    if (value && isOpen) {
      toggleListItem();
    }
  }, [value]);

  React.useEffect(() => {
    !isFocused && isOpen && toggleListItem();
  }, [isFocused]);

  return (
    <>
      {/* Selected value */}
      <Pressable onPress={toggleListItem} style={styles.choiceContainer}>
        <Text style={styles.choiceLabel}>{value}</Text>
        <FastImage
          source={require('../../assets/images/arrow_down.png')}
          style={styles.icon}
        />
      </Pressable>

      {/* Animated Dropdown */}
      <Animated.View style={[styles.listContainer, animatedStyles]}>
        <FlatList
          data={GAMES}
          bounces={false}
          style={styles.listStyle}
          renderItem={renderItem}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: DimensionsUtils.getDP(10),
    paddingHorizontal: DimensionsUtils.getDP(16),
    backgroundColor: Colors.white,
    borderRadius: DimensionsUtils.getDP(8),
  },
  listContainer: {
    maxHeight: DimensionsUtils.getDP(200),
    marginTop: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(8),
    overflow: 'hidden',
  },
  listStyle: {
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: Colors.white,
  },
  listItemContainer: {
    height: DimensionsUtils.getDP(50),
    paddingHorizontal: DimensionsUtils.getDP(16),
    paddingVertical: DimensionsUtils.getDP(12),
  },
  choiceLabel: {
    fontSize: DimensionsUtils.getDP(16),
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
  },
  regText: {
    fontSize: DimensionsUtils.getDP(16),
    fontFamily: 'Poppins-Regular',
  },
  boldText: {
    fontSize: DimensionsUtils.getDP(16),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default InputDropdown;
