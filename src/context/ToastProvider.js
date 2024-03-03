import Animated, {
  runOnJS,
  withTiming,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Image, Text, StyleSheet} from 'react-native';

import {Colors} from '../utils/Colors';
import {WIDTH, isIOS} from '../utils/GenericUtils';
import {DimensionsUtils} from '../utils/DimensionUtils';

const initialState = {
  icon: null,
  message: null,
};

const ToastContext = React.createContext();

export const ToastProvider = ({children}) => {
  const timeout = React.useRef();

  const topPost = isIOS
    ? toast?.top + 24 - 100 || -100
    : toast?.top + 24 - 112 || -112;

  const topPosition = useSharedValue(topPost);
  const [toast, setToast] = React.useState(initialState);

  //** ----- STYLES -----
  const animStyle = useAnimatedStyle(() => ({top: topPosition.value}), []);

  //** ----- FUNCTIONS -----
  const animateToast = React.useCallback(() => {
    const toastTop = isIOS ? -100 : -112;

    if (toast.message) {
      topPosition.value = withSpring(54, {
        mass: 3,
        damping: 30,
        stiffness: 125,
      });

      timeout.current = setTimeout(() => {
        topPosition.value = withTiming(toastTop, {duration: 500}, done => {
          if (done) {
            runOnJS(setToast)(initialState);
            runOnJS(clearTimeout)(timeout.current);
            timeout.current = null;
          }
        });
      }, 3500);
    }
  }, [timeout, toast.message, topPosition]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    animateToast();
  }, [animateToast, toast]);

  return (
    <ToastContext.Provider value={{setToast}}>
      {children}
      <Animated.View style={[animStyle, styles.container]}>
        {toast.icon && <Image source={toast.icon} style={styles.image} />}
        <Text style={styles.message}>{toast.message}</Text>
      </Animated.View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    padding: DimensionsUtils.getDP(12),
    paddingHorizontal: DimensionsUtils.getDP(16),
    position: 'absolute',
    borderRadius: DimensionsUtils.getDP(8),
    width: WIDTH - DimensionsUtils.getDP(32),
    alignSelf: 'center',
    backgroundColor: Colors.tabBarIcon,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: DimensionsUtils.getDP(42),
    height: DimensionsUtils.getDP(42),
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
