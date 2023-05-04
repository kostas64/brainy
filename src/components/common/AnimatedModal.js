import React from 'react';
import {Animated, StyleSheet, Pressable} from 'react-native';

import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimPress = Animated.createAnimatedComponent(Pressable);

const AnimatedModal = ({content, gameOver, modalOpen, setModalOpen}) => {
  const [animFinished, setAnimFinished] = React.useState(false);
  const opacityRef = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(1000)).current;

  React.useEffect(() => {
    if (gameOver) {
      Animated.parallel([
        Animated.timing(opacityRef, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 3,
          tension: 20,
          useNativeDriver: true,
        }),
      ]).start(() => setAnimFinished(true));
    }
  }, [gameOver, modalOpen]);

  const closeAnimation = () => {
    Animated.parallel([
      Animated.timing(opacityRef, {
        toValue: 0,
        duration: 125,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 1000,
        friction: 3,
        tension: 20,
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useEffect(() => {
    animFinished && setModalOpen(false);
  }, [animFinished]);

  return (
    modalOpen && (
      <AnimPress
        disabled={!animFinished}
        onPress={closeAnimation}
        style={[
          styles.container,
          {
            zIndex: 1000,
            opacity: opacityRef,
          },
        ]}>
        <Animated.View
          style={{
            backgroundColor: 'white',
            borderRadius: DimensionsUtils.getDP(12),
            transform: [{translateY}],
          }}>
          {content}
        </Animated.View>
      </AnimPress>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default AnimatedModal;
