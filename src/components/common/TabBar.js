import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Touchable from './Touchable';
import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const gamesI = images.gamesIcon;
const gamesIO = images.gamesIconO;
const rankI = images.rankIcon;
const rankIO = images.rankIconO;
const profileI = images.profile;
const profileIO = images.profile_o;

const TabBar = props => {
  const insets = useSafeAreaInsets();
  const translateRef = React.useRef(new Animated.Value(0)).current;

  const {routes, index: activeRouteIndex} = props.state;

  //** ----- STYLES -----
  const translateX = translateRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (WIDTH - DimensionsUtils.getDP(32)) / routes.length],
  });

  const poseStyles = [
    styles.pose,
    {transform: [{translateX}]},
    {width: (WIDTH - DimensionsUtils.getDP(32)) / routes.length},
  ];

  const innerStyles = [
    styles.innerContainer,
    insets.bottom > 0 ? {marginBottom: insets.bottom} : styles.spaceBottom,
  ];

  const touchableStyles = [
    styles.tabButton,
    insets.bottom !== 0 && styles.height80,
  ];

  //** ----- FUNCTIONS -----
  const renderIcon = React.useCallback(({route, focused}) => {
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
        : route.name === dict.profileScrTitle && focused
        ? profileIO
        : profileI;

    style =
      route.name === dict.gamesScrTitle
        ? styles.gamesIcon
        : route.name === dict.rankScrTitle
        ? styles.rankIcon
        : styles.profileIcon;

    return <FastImage source={iconName} style={style} />;
  }, []);

  const getLabel = React.useCallback((name, focused) => {
    const style = {
      color: focused ? Colors.white : Colors.tabBarIcon,
      fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Medium',
    };

    return <Text style={[styles.text, style]}>{name}</Text>;
  }, []);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    Animated.timing(translateRef, {
      duration: 100,
      toValue: activeRouteIndex,
      useNativeDriver: true,
    }).start();
  }, [translateRef, activeRouteIndex]);

  return (
    <View style={styles.container}>
      <View style={innerStyles}>
        <View style={{...StyleSheet.absoluteFillObject}}>
          <Animated.View style={poseStyles} />
        </View>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;

          return (
            <Touchable
              key={routeIndex}
              style={touchableStyles}
              onPressIn={() => {
                props.navigation.navigate(routes?.[routeIndex].name);
              }}>
              {renderIcon({route, focused: isRouteActive})}
              {getLabel(routes?.[routeIndex].name, isRouteActive)}
            </Touchable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: Colors.background,
    bottom: 0,
  },
  innerContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.tabBarBg,
    borderRadius: DimensionsUtils.getDP(16),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  pose: {
    height: 50,
    backgroundColor: Colors.appGreen,
    borderRadius: DimensionsUtils.getDP(16),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DimensionsUtils.getDP(6),
  },
  gamesIcon: {
    width: 31,
    height: 21,
  },
  rankIcon: {
    width: 32,
    height: 24,
  },
  profileIcon: {
    width: 23,
    height: 23,
  },
  text: {
    marginTop: DimensionsUtils.getDP(4),
    fontSize: DimensionsUtils.getFontSize(12),
    fontFamily: 'Poppins-Medium',
  },
  height80: {
    height: '80%',
  },
  spaceBottom: {
    marginBottom: DimensionsUtils.getDP(16),
  },
});

export default TabBar;
