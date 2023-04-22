import moment from 'moment';
import React, {useImperativeHandle} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Timer = ({interval, style}) => {
  const pad = n => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);
  const centiseconds = Math.floor(duration.milliseconds() / 10);
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(duration.minutes())}:</Text>
      <Text style={style}>{pad(duration.seconds())},</Text>
      <Text style={[style, {width: 30}]}>{pad(centiseconds)}</Text>
    </View>
  );
};

let timer;

const StopWatch = React.forwardRef((props, ref) => {
  const [laps, setLaps] = React.useState([]);
  const [startState, setStartState] = React.useState(0);
  const [now, setNowState] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  useImperativeHandle(ref, () => ({
    start,
    stop,
    reset,
    isRunning,
  }));

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
    paddingVertical: DimensionsUtils.getDP(8),
    paddingHorizontal: DimensionsUtils.getDP(12),
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: '#0D0D0D',
  },
  timer: {
    color: '#FFFFFF',
    fontSize: DimensionsUtils.getFontSize(24),
    fontFamily: 'DiloWorld',
    width: DimensionsUtils.getDP(36),
  },
  timerContainer: {
    flexDirection: 'row',
  },
});
