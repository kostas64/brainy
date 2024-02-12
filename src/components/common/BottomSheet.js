import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {Colors} from '../../utils/Colors';
import {HEIGHT} from '../../utils/GenericUtils';
import useBackAction from '../../hooks/useBackAction';
import {useModalContext} from '../../context/ModalProvider';

const BottomSheet = React.forwardRef(
  (
    {
      children,
      modalHeight,
      onBackPress,
      panEnabled = true,
      withoutLine = false,
      contentContainerStyle,
    },
    ref,
  ) => {
    const MAX_TRANSLATE_Y =
      (modalHeight > 0 ? -modalHeight : modalHeight) || -HEIGHT + 50;

    const {resetModal} = useModalContext();
    const active = useSharedValue(false);
    const translateY = useSharedValue(0);
    const context = useSharedValue({y: 0});
    const [isActive, setIsActive] = React.useState(false);
    const [isPanEnabled, setIsPanEnabled] = React.useState(panEnabled);

    //** ----- STYLES -----
    const animBottomSheetStyle = useAnimatedStyle(
      () => ({
        borderRadius: 12,
        transform: [{translateY: translateY.value}],
      }),
      [],
    );

    const rBackdropStyle = useAnimatedStyle(
      () => ({
        opacity: withTiming(active.value ? 1 : 0),
      }),
      [],
    );

    const rBackdropProps = useAnimatedProps(
      () => ({
        pointerEvents: active.value ? 'auto' : 'none',
      }),
      [],
    );

    const bottomSheetStyles = [
      styles.bottomSheetContainer,
      contentContainerStyle,
      animBottomSheetStyle,
    ];

    //** ----- FUNCTIONS -----
    const scrollTo = React.useCallback(
      destination => {
        'worklet';

        runOnJS(setIsActive)(destination !== 0);
        active.value = destination !== 0;
        translateY.value = withTiming(
          destination,
          {
            duration: 200,
          },
          done => {
            if (done && destination === 0) {
              runOnJS(resetModal)();
            }
          },
        );
      },
      [active, resetModal, translateY],
    );

    const onBackdropPress = React.useCallback(() => {
      // Dismiss the BottomSheet
      !!onBackPress && onBackPress();
      scrollTo(0);
    }, [scrollTo, onBackPress]);

    const onBackHandlerPress = React.useCallback(() => {
      if (isActive) {
        scrollTo(0);
        return true;
      }
    }, [isActive, scrollTo]);

    //** ----- EFFECTS -----
    useBackAction(onBackHandlerPress);

    React.useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);

    React.useEffect(() => {
      panEnabled !== isPanEnabled && setIsPanEnabled(panEnabled);
    }, [panEnabled, isPanEnabled]);

    //** ----- GESTURES
    const gesture = Gesture.Pan()
      .enabled(isPanEnabled)
      .onStart(() => {
        context.value = {y: translateY.value};
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (Math.abs(MAX_TRANSLATE_Y) - Math.abs(translateY.value) < 50) {
          scrollTo(MAX_TRANSLATE_Y);
        } else {
          !!onBackPress && runOnJS(onBackPress)();
          scrollTo(0);
        }
      });

    const wrappedChildren =
      -MAX_TRANSLATE_Y === 0.9 * HEIGHT ? (
        <View style={{height: -MAX_TRANSLATE_Y - 40}}>{children}</View>
      ) : (
        children
      );

    return (
      <>
        <Animated.View
          onTouchStart={onBackdropPress}
          animatedProps={rBackdropProps}
          style={[styles.backdrop, rBackdropStyle]}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={bottomSheetStyles}>
            {!withoutLine && <View style={styles.line} />}
            {wrappedChildren}
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheetContainer: {
    height: HEIGHT,
    width: '100%',
    backgroundColor: Colors.tabBarBg,
    position: 'absolute',
    top: HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
    alignSelf: 'center',
    backgroundColor: Colors.appGreen,
  },
});

export default React.memo(BottomSheet);
