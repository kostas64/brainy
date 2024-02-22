import Animated, {
  withDelay,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, Pressable, StyleSheet, TextInput, View} from 'react-native';

import {Colors} from '../utils/Colors';
import images from '../assets/images/images';
import useTimeout from '../hooks/useTimeout';
import {WIDTH, isIOS} from '../utils/GenericUtils';
import {DimensionsUtils} from '../utils/DimensionUtils';

const AnimPress = Animated.createAnimatedComponent(Pressable);
const AnimInput = Animated.createAnimatedComponent(TextInput);

const SearchScreen = ({onPressArrow}) => {
  const timeout = useTimeout();
  const insets = useSafeAreaInsets();

  const inputRef = React.useRef();
  const inputWidth = useSharedValue(40);
  const arrowOpacity = useSharedValue(0);

  //** ----- STYLES -----
  const contStyles = [
    styles.container,
    {paddingTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24)},
  ];

  const fontFam = isIOS ? {fontFamily: 'Poppins-Regular'} : {};

  const animPress = useAnimatedStyle(() => ({
    opacity: arrowOpacity.value,
  }));

  const animInputStyle = useAnimatedStyle(() => ({
    width: inputWidth.value,
  }));

  //** ----- FUNCTIONS -----
  const onPressBack = React.useCallback(() => {
    arrowOpacity.value = withTiming(0, {duration: 150});
    inputWidth.value = withTiming(40);
    inputRef.current?.blur();

    timeout.current = setTimeout(() => {
      onPressArrow();
    }, 150);
  }, [timeout, inputWidth, arrowOpacity, onPressArrow]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    arrowOpacity.value = withDelay(150, withTiming(1, {duration: 150}));
    inputWidth.value = withTiming(WIDTH - DimensionsUtils.getDP(62));
    inputRef.current?.focus();
  }, [timeout, inputWidth, arrowOpacity]);

  return (
    <View style={contStyles}>
      <View style={styles.inputRowContainer}>
        <AnimPress
          onPress={onPressBack}
          style={[styles.chevronContainer, animPress]}>
          <Image style={styles.chevron} source={images.arrowDown} />
        </AnimPress>

        <AnimInput
          ref={inputRef}
          placeholder={'Search players'}
          selectionColor={Colors.appGreen}
          placeholderTextColor={Colors.tabBarIcon}
          style={[styles.input, fontFam, animInputStyle]}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inputRowContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: DimensionsUtils.getDP(6),
    paddingRight: DimensionsUtils.getDP(16),
  },
  chevronContainer: {
    padding: DimensionsUtils.getDP(10),
  },
  chevron: {
    tintColor: Colors.appGreen,
    transform: [{rotate: '90deg'}],
    width: DimensionsUtils.getDP(20),
    height: DimensionsUtils.getDP(20),
  },
  input: {
    height: 40,
    color: Colors.white,
    borderColor: Colors.appGreen,
    borderWidth: DimensionsUtils.getDP(2),
    paddingLeft: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(24),
  },
});
