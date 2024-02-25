import {withTiming} from 'react-native-reanimated';

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
