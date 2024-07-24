/* eslint-disable react-hooks/exhaustive-deps */
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Text, Pressable, StyleSheet, FlatList, Image, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import {GAMES} from '../../assets/values/games';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimatedIcon = Animated.createAnimatedComponent(Image);

const InputDropdown = React.forwardRef(
  ({value, setValue, isFocused, placeholder}, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const icon = useSharedValue(0);
    const height = useSharedValue(0);
    const mgBottom = useSharedValue(0);

    //** ----- STYLES -----
    const iconStyles = useAnimatedStyle(
      () => ({transform: [{rotate: `${icon.value}deg`}]}),
      [],
    );

    const heightStyles = useAnimatedStyle(
      () => ({height: height.value, marginBottom: mgBottom.value}),
      [],
    );

    //** ----- FUNCTIONS -----
    const onPress = React.useCallback((isSelected, index) => {
      if (!isSelected) {
        setValue(GAMES[index]);
      } else {
        toggleListItem();
      }
    }, []);

    const toggleListItem = React.useCallback(() => {
      if (isOpen) {
        height.value = withTiming(0);
        icon.value = withTiming(0);
        mgBottom.value = withTiming(0);
      } else {
        icon.value = withTiming(180);
        height.value = withTiming(DimensionsUtils.getDP(200));
        mgBottom.value = withTiming(DimensionsUtils.getDP(12));
      }

      setIsOpen(open => !open);
    }, [isOpen, icon, height]);

    const renderItem = ({item, index}) => {
      const isSelected = value === GAMES[index];

      return (
        <Pressable
          onPress={() => onPress(isSelected, index)}
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

    //** ----- EFFECTS -----
    React.useImperativeHandle(ref, () => ({
      isDropdownOpen: () => {
        return isOpen;
      },
      toggleDropdown: () => {
        isOpen && toggleListItem();
      },
    }));

    React.useEffect(() => {
      if (value && isOpen) {
        toggleListItem();
      }
    }, [value]);

    React.useEffect(() => {
      !isFocused && isOpen && toggleListItem();
    }, [isOpen, isFocused]);

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
              source={images.arrowDown}
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
  },
);

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
    marginTop: DimensionsUtils.getDP(12),
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
    top: DimensionsUtils.getDP(-5),
    color: Colors.tabBarIcon,
    fontSize: DimensionsUtils.getFontSize(12),
    width: DimensionsUtils.getDP(120),
  },
  choiceContainer: {
    top: DimensionsUtils.getDP(4),
    paddingTop: DimensionsUtils.getDP(8),
  },
  choiceLabel: {
    color: Colors.appGreen,
    top: DimensionsUtils.getDP(1),
    fontSize: DimensionsUtils.getFontSize(16),
    fontFamily: 'Poppins-Bold',
  },
  icon: {
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(16),
    height: DimensionsUtils.getDP(16),
  },
  regText: {
    color: Colors.tabBarIcon,
    fontSize: DimensionsUtils.getFontSize(16),
    fontFamily: 'Poppins-Regular',
  },
  boldText: {
    color: Colors.white,
    top: DimensionsUtils.getDP(1),
    fontSize: DimensionsUtils.getFontSize(16),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default InputDropdown;
