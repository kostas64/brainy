import React from 'react';
import {Modal, Pressable, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {HEIGHT, WIDTH, isIOS} from '../../utils/GenericUtils';

const IMG_FINAL_SIZE = 160;
const AnimPressable = Animated.createAnimatedComponent(Pressable);

const UserProfileModalAnimatedAvatar = ({
  show,
  source,
  imgSize,
  progress,
  avatarPos,
  onPressOut,
}) => {
  const insets = useSafeAreaInsets();

  const input = [0, 1];
  const bottom = insets.bottom > 0 ? insets.bottom + 8 : 24;

  //** ----- STYLES -----
  const modalStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(progress.value, input, input),
    }),
    [],
  );

  const buttonStyle = useAnimatedStyle(
    () => ({
      transform: [
        {translateY: interpolate(progress.value, input, [0, -bottom])},
      ],
    }),
    [],
  );

  const animImgStyle = useAnimatedStyle(() => {
    const isInitial =
      !avatarPos?.x ||
      !avatarPos?.y ||
      avatarPos?.y === 0 ||
      avatarPos?.x === 0;

    return {
      top: interpolate(progress.value, input, [
        avatarPos?.y + 5 || 0,
        (HEIGHT - IMG_FINAL_SIZE) / 2,
      ]),
      left: interpolate(progress.value, input, [
        avatarPos?.x + 5 || 0,
        (WIDTH - IMG_FINAL_SIZE) / 2,
      ]),
      width: isInitial
        ? 0
        : interpolate(progress.value, input, [imgSize, IMG_FINAL_SIZE]),
      height: isInitial
        ? 0
        : interpolate(progress.value, input, [imgSize, IMG_FINAL_SIZE]),
      borderRadius: interpolate(progress.value, input, [
        imgSize / 2,
        IMG_FINAL_SIZE / 2,
      ]),
    };
  }, [progress, avatarPos]);

  if (!show) {
    return <Animated.Image source={source} style={styles.hiddenImg} />;
  }

  return (
    <Modal transparent>
      <Animated.View style={[modalStyle, styles.backDrop]} />
      <Animated.Image source={source} style={animImgStyle} />
      <AnimPressable
        onPress={onPressOut}
        style={[modalStyle, buttonStyle, styles.closeContainer]}>
        <Text style={styles.closeLabel}>{dict.close}</Text>
      </AnimPressable>
    </Modal>
  );
};

export default UserProfileModalAnimatedAvatar;

const styles = StyleSheet.create({
  backDrop: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    backgroundColor: Colors.black,
  },
  closeContainer: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  closeLabel: {
    top: isIOS ? 0 : -1,
    color: Colors.white,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(16),
  },
  hiddenImg: {
    height: 0,
    width: 0,
  },
});
