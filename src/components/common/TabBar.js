import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width: WIDTH} = Dimensions.get('window');

const gamesI = require('../../assets/images/games_icon.png');
const gamesIO = require('../../assets/images/games_icon_outline.png');
const rankI = require('../../assets/images/rank_icon.png');
const rankIO = require('../../assets/images/rank_icon_outline.png');

const TabBar = props => {
  const insets = useSafeAreaInsets();
  const translateRef = React.useRef(new Animated.Value(0)).current;

  const {routes, index: activeRouteIndex} = props.state;

  const renderIcon = ({route, focused}) => {
    let iconName;

    iconName =
      route.name === 'Games' && focused
        ? gamesI
        : route.name === 'Games'
        ? gamesIO
        : route.name === 'Rank' && focused
        ? rankI
        : rankIO;

    return (
      <FastImage
        source={iconName}
        style={route.name === 'Games' ? styles.gamesIcon : styles.rankIcon}
      />
    );
  };

  const getLabel = (name, focused) => {
    const color = {
      color: focused ? 'white' : '#8e8e8e',
    };

    return <Text style={[styles.text, color]}>{name}</Text>;
  };

  const translateX = translateRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (WIDTH - DimensionsUtils.getDP(32)) / 2],
  });

  React.useEffect(() => {
    const toValue = activeRouteIndex === 1 ? 1 : 0;
    Animated.timing(translateRef, {
      toValue,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [activeRouteIndex]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          {
            marginBottom:
              insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(16),
          },
        ]}>
        <View style={{...StyleSheet.absoluteFillObject}}>
          <Animated.View
            style={[
              styles.pose,
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          />
        </View>
        {routes.map((route, routeIndex) => {
          const isRouteActive = routeIndex === activeRouteIndex;

          return (
            <TouchableOpacity
              key={routeIndex}
              style={[styles.tabButton, insets.bottom !== 0 && {height: '80%'}]}
              activeOpacity={0.4}
              onPress={() => {
                props.navigation.navigate(routes?.[routeIndex].name);
              }}>
              {renderIcon({route, focused: isRouteActive})}
              {getLabel(routes?.[routeIndex].name, isRouteActive)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: DimensionsUtils.getDP(54),
    borderRadius: DimensionsUtils.getDP(16),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  pose: {
    backgroundColor: '#8ada4d',
    height: DimensionsUtils.getDP(54),
    width: (WIDTH - DimensionsUtils.getDP(32)) / 2,
    borderRadius: DimensionsUtils.getDP(16),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DimensionsUtils.getDP(6),
  },
  gamesIcon: {
    width: DimensionsUtils.getIconSize(36),
    height: DimensionsUtils.getIconSize(25),
  },
  rankIcon: {
    width: DimensionsUtils.getIconSize(36),
    height: DimensionsUtils.getIconSize(27),
  },
  text: {
    marginTop: DimensionsUtils.getDP(4),
    fontSize: DimensionsUtils.getFontSize(14),
    fontFamily: 'Poppins-SemiBold',
  },
});

export default TabBar;
