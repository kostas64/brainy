import React from 'react';
import {withTiming} from 'react-native-reanimated';

import SkeletonFriend from '../components/skeleton/SkeletonFriend';
import SkeletonProfile from '../components/skeleton/SkeletonProfile';

export const animateInput = sharedValue => {
  sharedValue.value = withTiming(12, {duration: 50}, () => {
    sharedValue.value = withTiming(-12, {duration: 100}, () => {
      sharedValue.value = withTiming(6, {duration: 90}, () => {
        sharedValue.value = withTiming(-6, {duration: 90}, () => {
          sharedValue.value = withTiming(0, {duration: 50});
        });
      });
    });
  });
};

export const getSkeleton = (type, skeletonStyle, animatedStyle) => {
  if (type === 'friendReq' || type === 'friends') {
    return (
      <>
        <SkeletonFriend
          skeletonStyle={skeletonStyle}
          animatedStyle={animatedStyle}
        />
        <SkeletonFriend
          skeletonStyle={skeletonStyle}
          animatedStyle={animatedStyle}
        />
        <SkeletonFriend
          skeletonStyle={skeletonStyle}
          animatedStyle={animatedStyle}
        />
        <SkeletonFriend
          skeletonStyle={skeletonStyle}
          animatedStyle={animatedStyle}
        />
      </>
    );
  } else if (type === 'profile') {
    return (
      <>
        <SkeletonProfile
          skeletonStyle={skeletonStyle}
          animatedStyle={animatedStyle}
        />
      </>
    );
  }
};
