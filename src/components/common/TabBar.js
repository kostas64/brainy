import Animated, {
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {WIDTH, isIOS} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const gamesI = images.gamesIcon;
const gamesIO = images.gamesIconO;
const rankI = images.rankIcon;
const rankIO = images.rankIconO;
const profileI = images.profile;
const profileIO = images.profile_o;

const TabBar = props => {
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(0);
  const height = useSharedValue(50);

  const gW = useSharedValue(31);
  const gH = useSharedValue(21);
  const rW = useSharedValue(32);
  const rH = useSharedValue(24);
  const p = useSharedValue(23);

  const {routes, index: activeRouteIndex} = props.state;

  const focusedOptions =
    props?.descriptors[props.state.routes[props.state.index].key].options;

  //** ----- STYLES -----
  const innerAnimContainerStyle = useAnimatedStyle(
    () => ({height: height.value}),
    [],
  );

  const animatedPose = useAnimatedStyle(
    () => ({
      height: height.value,
      transform: [
        {
          translateX: interpolate(
            translateX.value,
            [0, 1],
            [0, (WIDTH - 32) / routes.length],
          ),
        },
      ],
    }),
    [],
  );

  const poseStyles = [
    styles.pose,
    animatedPose,
    {width: (WIDTH - 32) / routes.length},
  ];

  const innerStyles = [
    styles.innerContainer,
    innerAnimContainerStyle,
    insets.bottom > 0
      ? {marginBottom: insets.bottom}
      : isIOS
      ? styles.spaceBottom
      : styles.smallSpaceBottom,
  ];

  const touchableStyles = [
    styles.tabButton,
    insets.bottom !== 0 && styles.height80,
  ];

  const gamesIconStyle = useAnimatedStyle(
    () => ({width: gW.value, height: gH.value}),
    [],
  );

  const rankIconStyle = useAnimatedStyle(
    () => ({width: rW.value, height: rH.value}),
    [],
  );

  const profIconStyle = useAnimatedStyle(
    () => ({width: p.value, height: p.value, top: 1}),
    [],
  );

  //** ----- FUNCTIONS -----
  const renderIcon = React.useCallback(
    ({route, focused}) => {
      let iconName, style;

      iconName =
        route.name === dict.gamesScrTitle && focused
          ? gamesI
          : route.name === dict.gamesScrTitle
          ? gamesIO
          : route.name === dict.rankScrTitle && focused
          ? rankI
          : route.name === dict.rankScrTitle
          ? rankIO
          : route.name === dict.myProfileScrTitle && focused
          ? profileIO
          : profileI;

      style =
        route.name === dict.gamesScrTitle
          ? gamesIconStyle
          : route.name === dict.rankScrTitle
          ? rankIconStyle
          : profIconStyle;

      return (
        <Animated.Image
          source={iconName}
          style={[style, focused && styles.tintColor]}
        />
      );
    },
    [gamesIconStyle, rankIconStyle, profIconStyle],
  );

  const getLabel = React.useCallback((name, focused) => {
    const style = {
      color: focused ? Colors.background : Colors.tabBarIcon,
      fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Medium',
    };

    const tabName = name === 'MyProfile' ? 'Profile' : name;

    return <Text style={[styles.text, style]}>{tabName}</Text>;
  }, []);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    translateX.value = withTiming(activeRouteIndex, {duration: 100});
  }, [translateX, activeRouteIndex]);

  React.useEffect(() => {
    const isNone = focusedOptions?.tabBarStyle?.display === 'none';

    height.value = isNone ? 0 : 50;
    gW.value = isNone ? 0 : 31;
    gH.value = isNone ? 0 : 21;
    rW.value = isNone ? 0 : 32;
    rH.value = isNone ? 0 : 24;
    p.value = isNone ? 0 : 23;
  }, [height, p, gW, gH, rW, rH, focusedOptions.tabBarStyle]);

  return (
    <View style={styles.container}>
      <Animated.View style={innerStyles}>
        <View style={{...StyleSheet.absoluteFillObject}}>
          <Animated.View style={poseStyles} />
        </View>
        {routes.map((route, routeIndex) => {
          const isActive = routeIndex === activeRouteIndex;

          return (
            <Pressable
              key={routeIndex}
              style={touchableStyles}
              onPressIn={() => {
                props.navigation.navigate(routes?.[routeIndex].name);
              }}>
              {renderIcon({route, focused: isActive})}
              {getLabel(routes?.[routeIndex].name, isActive)}
            </Pressable>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    bottom: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.tabBarBg,
    borderRadius: DimensionsUtils.getDP(16),
    marginHorizontal: 16,
  },
  pose: {
    backgroundColor: Colors.appGreen,
    borderRadius: DimensionsUtils.getDP(16),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DimensionsUtils.getDP(6),
  },
  text: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: DimensionsUtils.getDP(4),
  },
  height80: {
    height: '80%',
  },
  smallSpaceBottom: {
    marginBottom: DimensionsUtils.getDP(4),
  },
  spaceBottom: {
    marginBottom: DimensionsUtils.getDP(16),
  },
  tintColor: {
    tintColor: Colors.background,
  },
});

export default TabBar;
