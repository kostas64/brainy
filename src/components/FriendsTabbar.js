import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Colors} from '../utils/Colors';
import {isAndroid} from '../utils/GenericUtils';
import {DimensionsUtils} from '../utils/DimensionUtils';

const FriendsTabbar = props => {
  const navState = props.navigationState;
  const selectedItem = navState?.index;

  //** ----- STYLES -----
  const tabStyles = index => [
    styles.tabContainer,
    selectedItem === index && styles.selected,
  ];

  //** ----- FUNCTIONS -----
  const onPress = React.useCallback(
    item => {
      props.jumpTo(item.key);
    },
    [props],
  );

  return (
    <View style={styles.row}>
      {navState.routes?.map((item, index) => (
        <TouchableOpacity
          style={tabStyles(index)}
          onPress={() => onPress(item)}
          key={`friends-tabbar-${index}`}>
          <Text style={styles.label}>{item.title}</Text>
          {selectedItem === index && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FriendsTabbar;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  tabContainer: {
    backgroundColor: Colors.veryLightGrey,
    paddingVertical: DimensionsUtils.getDP(8),
    paddingHorizontal: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(30),
    marginTop: DimensionsUtils.getDP(8),
    marginLeft: DimensionsUtils.getDP(16),
  },
  label: {
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    top: isAndroid ? 1 : 0,
  },
  selected: {
    backgroundColor: Colors.appGreen,
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -DimensionsUtils.getDP(12),
    height: DimensionsUtils.getDP(6),
    width: DimensionsUtils.getDP(6),
    borderRadius: DimensionsUtils.getDP(3),
    backgroundColor: Colors.appGreen,
  },
});
