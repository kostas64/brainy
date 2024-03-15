import Animated, {
  withRepeat,
  withTiming,
  useSharedValue,
  cancelAnimation,
  useAnimatedStyle,
  useAnimatedReaction,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../common/Button';
import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ProfileFriendButtons = ({
  loading,
  loadingBtn,
  hasFriendship,
  firstButtonLabel,
  secondButtonLabel,
  showSecondButton,
  secondBtnContainer,
  onPressFirstButton,
  onPressSecondButton,
  secondButtonLabelStyle,
}) => {
  const opacity = useSharedValue(0.5);

  //** ----- STYLES -----
  const animatedStyle = useAnimatedStyle(() => ({opacity: opacity.value}), []);

  //** ----- EFFECTS -----
  useAnimatedReaction(
    () => ({loading}),
    () => {
      if (loading) {
        opacity.value = 0.5;
        opacity.value = withRepeat(withTiming(1, {duration: 500}), -1, true);
      } else {
        cancelAnimation(opacity);
      }
    },
    [loading],
  );

  return !loading ? (
    <View style={styles.container}>
      <Button
        disabled={!!loadingBtn}
        label={firstButtonLabel}
        onPress={onPressFirstButton}
        loading={loadingBtn === 'FIRST'}
        containerStyle={[
          hasFriendship && styles.firstBtnContainerColor,
          showSecondButton && styles.firstBtnContainerWidth,
        ]}
      />
      {showSecondButton && (
        <Button
          disabled={!!loadingBtn}
          label={secondButtonLabel}
          onPress={onPressSecondButton}
          loading={loadingBtn === 'SECOND'}
          labelStyle={secondButtonLabelStyle}
          containerStyle={[styles.secondBtnContainerStyle, secondBtnContainer]}
        />
      )}
    </View>
  ) : (
    <Animated.View style={[animatedStyle, styles.skeletonBtn]} />
  );
};

export default ProfileFriendButtons;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
  },
  firstBtnContainerWidth: {
    width: (WIDTH - 56) / 2,
  },
  firstBtnContainerColor: {
    backgroundColor: Colors.fillRed,
  },
  secondBtnContainerStyle: {
    marginLeft: 16,
    width: (WIDTH - 56) / 2,
    backgroundColor: Colors.white,
  },
  skeletonBtn: {
    marginLeft: 20,
    width: WIDTH - 40,
    height: DimensionsUtils.getDP(50),
    backgroundColor: Colors.lightGrey,
    borderRadius: DimensionsUtils.getDP(12),
  },
});
