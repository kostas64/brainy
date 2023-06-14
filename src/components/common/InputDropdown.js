import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, Pressable, StyleSheet, FlatList, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {GAMES} from '../../assets/values/games';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimatedIcon = Animated.createAnimatedComponent(FastImage);

const InputDropdown = ({
  value,
  setValue,
  isFocused,
  onFieldPress,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const icon = useSharedValue(0);
  const height = useSharedValue(0);

  const iconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${icon.value}deg`,
        },
      ],
    };
  });

  const heightStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const toggleListItem = () => {
    !!onFieldPress && onFieldPress();

    if (isOpen) {
      height.value = withTiming(0);
      icon.value = withTiming(0);
    } else {
      icon.value = withTiming(180);
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
      <Pressable onPress={toggleListItem} style={styles.inputContainer}>
        <View style={styles.innerInput}>
          <View>
            <Text style={styles.placeholder}>{placeholder}</Text>
            <View style={styles.choiceContainer}>
              <Text style={styles.choiceLabel}>{value}</Text>
            </View>
          </View>
          <AnimatedIcon
            source={require('../../assets/images/arrow_down.png')}
            style={[styles.icon, iconStyles]}
          />
        </View>
      </Pressable>

      {/* Animated Dropdown */}
      <Animated.View style={[styles.listContainer, heightStyles]}>
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
  inputContainer: {
    paddingVertical: DimensionsUtils.getDP(10),
    paddingHorizontal: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarBg,
    borderRadius: DimensionsUtils.getDP(8),
  },
  innerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    maxHeight: DimensionsUtils.getDP(200),
    marginTop: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(8),
    overflow: 'hidden',
  },
  listStyle: {
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: Colors.tabBarBg,
  },
  listItemContainer: {
    height: DimensionsUtils.getDP(50),
    paddingHorizontal: DimensionsUtils.getDP(16),
    paddingVertical: DimensionsUtils.getDP(12),
  },
  placeholder: {
    position: 'absolute',
    left: DimensionsUtils.getDP(-8),
    top: DimensionsUtils.getDP(-4),
    color: Colors.tabBarIcon,
    fontSize: DimensionsUtils.getFontSize(12),
    width: DimensionsUtils.getDP(120),
  },
  choiceContainer: {
    top: DimensionsUtils.getDP(4),
    paddingTop: DimensionsUtils.getDP(8),
  },
  choiceLabel: {
    color: Colors.tabBarIcon,
    fontSize: DimensionsUtils.getDP(16),
    fontFamily: 'Poppins-Bold',
  },
  icon: {
    width: DimensionsUtils.getDP(16),
    height: DimensionsUtils.getDP(16),
  },
  regText: {
    color: Colors.tabBarIcon,
    fontSize: DimensionsUtils.getDP(16),
    fontFamily: 'Poppins-Regular',
  },
  boldText: {
    color: Colors.white,
    fontSize: DimensionsUtils.getDP(16),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default InputDropdown;
