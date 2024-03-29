/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {isAndroid} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const CountdownTimer = React.forwardRef(({seconds, setIsFinished}, ref) => {
  const [timeState, setTime] = React.useState(seconds * 1000);
  const [isRunning, setIsRunning] = React.useState(false);
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  //** ----- FUNCTIONS -----
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

  //** ----- EFFECTS -----
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

  return (
    <View style={[styles.container]}>
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
    paddingVertical: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.appGreen,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: DimensionsUtils.getDP(4),
  },
  timer: {
    width: 34,
    fontSize: 20,
    lineHeight: 28,
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
  },
});

export default CountdownTimer;
