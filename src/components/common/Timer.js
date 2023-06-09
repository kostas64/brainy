import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const CountdownTimer = React.forwardRef(({seconds, setIsFinished}, ref) => {
  const [timeState, setTime] = React.useState(seconds * 1000);
  const [isRunning, setIsRunning] = React.useState(false);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    isRunning,
    start,
    resetTime,
  }));

  React.useEffect(() => {
    if (isRunning) {
      previousTimeRef.current = performance.now();
    }
  }, [isRunning]);

  React.useEffect(() => {
    const animate = time => {
      const previousTime = previousTimeRef.current;
      const deltaTime = time - previousTime;
      previousTimeRef.current = time;

      if (isRunning && timeState > 0) {
        setTime(prevTime => Math.max(0, prevTime - deltaTime));
      } else if (isRunning && timeState <= 0) {
        setIsRunning(false);
        !!setIsFinished && setIsFinished();
      }
    };

    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, timeState]);

  const start = () => {
    setIsRunning(true);
  };

  const pad = (time, isMilliscs) =>
    time.toString().length >= 3
      ? time.toString().substring(0, isMilliscs ? 2 : 1)
      : time.toString().length === 1
      ? `0${time}`
      : `${time}`;

  const resetTime = () => {
    setTime(seconds * 1000);
  };

  const getTime = () => {
    const minutes = Math.floor(timeState / 60000);
    const seconds = Math.floor((timeState - minutes * 60000) / 1000);
    const milliseconds = timeState % 1000;

    return {
      minutes: pad(minutes),
      seconds: pad(seconds),
      milliseconds: pad(milliseconds, true),
    };
  };

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'android' && {height: DimensionsUtils.getDP(50)},
      ]}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{getTime().minutes}:</Text>
        <Text style={styles.timer}>{getTime().seconds}.</Text>
        <Text style={[styles.timer, {width: DimensionsUtils.getDP(32)}]}>
          {getTime().milliseconds}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: DimensionsUtils.getDP(120),
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: DimensionsUtils.getDP(4),
  },
  timer: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
    width: DimensionsUtils.getDP(36),
  },
});

export default CountdownTimer;
