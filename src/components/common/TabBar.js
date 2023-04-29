import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width: WIDTH} = Dimensions.get('window');

const TabBar = props => {
  const insets = useSafeAreaInsets();
  const {routes, index: activeRouteIndex} = props.state;

  const renderIcon = ({route, focused}) => {
    let iconName;
    console.log('Routte ', route);
    if (route.name === 'Games') {
      const icon = require('../../assets/images/games_icon.png');
      const icon_outline = require('../../assets/images/games_icon_outline.png');

      iconName = focused ? icon : icon_outline;
      return (
        <FastImage
          source={iconName}
          style={{
            width: DimensionsUtils.getIconSize(46),
            height: DimensionsUtils.getIconSize(32),
          }}
        />
      );
    } else if (route.name === 'Rank') {
      const icon = require('../../assets/images/rank_icon.png');
      const icon_outline = require('../../assets/images/rank_icon_outline.png');

      iconName = focused ? icon : icon_outline;
      return (
        <FastImage
          source={iconName}
          style={{
            width: DimensionsUtils.getIconSize(46),
            height: DimensionsUtils.getIconSize(34),
          }}
        />
      );
    }
  };

  const getLabel = (name, focused) => {
    const color = {
      color: focused ? '#043442' : 'rgba(0,0,0,0.5)',
    };

    return <Text style={[styles.text, color]}>{name}</Text>;
  };

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
    backgroundColor: '#043442',
    position: 'absolute',
    bottom: 0,
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: DimensionsUtils.getDP(68),
    borderRadius: DimensionsUtils.getDP(16),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DimensionsUtils.getDP(6),
  },
  text: {
    marginTop: DimensionsUtils.getDP(4),
    fontSize: DimensionsUtils.getFontSize(14),
    fontFamily: GenericUtils.fontFamily(),
  },
});

export default TabBar;
