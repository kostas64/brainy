/* eslint-disable no-shadow */
import React from 'react';
import moment from 'moment';
import {Text, View, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Timer = ({interval, style}) => {
  const pad = n => (n < 10 ? '0' + n : n);
  const duration = convertTime(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={[style, {width: DimensionsUtils.getDP(32)}]}>
        {pad(centiseconds)}
      </Text>
    </View>
  );
};

const convertTime = time => {
  return moment.duration(time);
};

let timer;

const StopWatch = React.forwardRef((props, ref) => {
  const [laps, setLaps] = React.useState([]);
  const [startState, setStartState] = React.useState(0);
  const [now, setNowState] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  //** ----- FUNCTIONS -----
  const start = () => {
    const now = new Date().getTime();
    setIsRunning(true);
    setStartState(now);
    setNowState(now);
    setLaps([0]);

    timer = setInterval(() => {
      setNowState(new Date().getTime());
    }, 100);
  };

  const stop = () => {
    const [firstLap, ...other] = laps;

    clearInterval(timer);
    setStartState(0);
    setNowState(0);
    setLaps([firstLap + now - startState, ...other]);
    setIsRunning(false);
  };

  const reset = () => {
    setStartState(0);
    setNowState(0);
    setLaps([]);
  };

  const extractTime = () =>
    convertTime(laps.reduce((total, curr) => total + curr, 0) + timerVar);

  //** ----- EFFECTS -----
  React.useImperativeHandle(ref, () => ({
    start,
    stop,
    reset,
    isRunning,
    extractTime,
  }));

  React.useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  const timerVar = now - startState;
  return (
    <View style={styles.container}>
      <Timer
        interval={laps.reduce((total, curr) => total + curr, 0) + timerVar}
        style={styles.timer}
      />
    </View>
  );
});

export default StopWatch;

const styles = StyleSheet.create({
  container: {
    height: DimensionsUtils.getDP(50),
    paddingVertical: DimensionsUtils.getDP(8),
    paddingHorizontal: DimensionsUtils.getDP(12),
    borderRadius: DimensionsUtils.getDP(8),
    borderWidth: 1,
    borderColor: Colors.appGreen,
    backgroundColor: Colors.background,
  },
  timer: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'Poppins-Regular',
    width: DimensionsUtils.getDP(36),
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
