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
    <View
      style={[
        styles.container,
        {
          height:
            insets.bottom > 0
              ? DimensionsUtils.getDP(58) + insets.bottom / 2
              : DimensionsUtils.getDP(58),
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopColor: 'rgba(0,0,0,0.15)',
    borderTopWidth: 1,
    alignItems: 'flex-start',
  },
  tabButton: {
    flex: 1,
    marginTop: DimensionsUtils.getDP(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: DimensionsUtils.getDP(4),
    fontSize: DimensionsUtils.getFontSize(14),
    fontFamily: GenericUtils.fontFamily(),
  },
});

export default TabBar;
