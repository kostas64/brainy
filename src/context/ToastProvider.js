/* eslint-disable react-hooks/exhaustive-deps */
import Animated, {
  runOnJS,
  withTiming,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {Colors} from '../utils/Colors';
import {WIDTH, isIOS} from '../utils/GenericUtils';
import {DimensionsUtils} from '../utils/DimensionUtils';

const initialState = {
  icon: null,
  message: null,
};

const TOP_POS = -100;
const ToastContext = React.createContext();

export const ToastProvider = ({children}) => {
  const timeout = React.useRef();
  const {insets} = initialWindowMetrics;
  const FINAL_POS = isIOS && insets.top < 24 ? 28 : isIOS ? insets.top + 4 : 24;

  const topPosition = useSharedValue(TOP_POS);
  const [toast, setToast] = React.useState(initialState);

  //** ----- STYLES -----
  const animStyle = useAnimatedStyle(() => ({top: topPosition.value}), []);

  //** ----- FUNCTIONS -----
  const closeToast = React.useCallback(() => {
    topPosition.value = withTiming(TOP_POS, {duration: 500}, done => {
      if (done) {
        runOnJS(setToast)(initialState);
        runOnJS(clearTimeout)(timeout.current);
        timeout.current = null;
      }
    });
  }, []);

  const animateToast = React.useCallback(() => {
    if (toast.message) {
      topPosition.value = withSpring(FINAL_POS, {
        mass: 3,
        damping: 30,
        stiffness: 125,
      });

      timeout.current = setTimeout(() => {
        closeToast();
      }, 3000);
    }
  }, [toast.message]);

  //** ----- EFFECTS -----
  const gesture = Gesture.Pan().onFinalize(e => {
    if (e.translationY < 0) {
      runOnJS(closeToast)();
    }
  });

  React.useEffect(() => {
    animateToast();
  }, [animateToast, toast]);

  return (
    <ToastContext.Provider value={{setToast}}>
      {children}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[animStyle, styles.row, styles.container]}>
          <View style={styles.leftPose} />
          <View style={styles.innerContainer}>
            {toast.icon && <Image source={toast.icon} style={styles.image} />}
            <Text style={styles.message}>{toast.message}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    position: 'absolute',
    alignSelf: 'center',
  },
  leftPose: {
    position: 'absolute',
    height: '100%',
    left: -DimensionsUtils.getDP(4),
    width: DimensionsUtils.getDP(12),
    backgroundColor: Colors.appGreen,
    borderTopLeftRadius: DimensionsUtils.getDP(8),
    borderBottomLeftRadius: DimensionsUtils.getDP(8),
  },
  innerContainer: {
    left: 3,
    height: 66,
    width: WIDTH - DimensionsUtils.getDP(32),
    backgroundColor: Colors.tabBarBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: DimensionsUtils.getDP(16),
    borderTopRightRadius: DimensionsUtils.getDP(8),
    borderBottomRightRadius: DimensionsUtils.getDP(8),
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: DimensionsUtils.getDP(5),
    marginRight: DimensionsUtils.getDP(12),
  },
  message: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(16),
    width: WIDTH - DimensionsUtils.getDP(112),
  },
});

export const useToastContext = () => {
  return React.useContext(ToastContext);
};
