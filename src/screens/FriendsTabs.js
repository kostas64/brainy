import Animated, {
  runOnJS,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {TabView} from 'react-native-tab-view';
import {StyleSheet, View} from 'react-native';

import {Colors} from '../utils/Colors';
import SearchScreen from './SearchScreen';
import {WIDTH} from '../utils/GenericUtils';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import YourFriendsScreen from './YourFriendsScreen';
import FriendsTabbar from '../components/FriendsTabbar';
import FriendRequestsScreens from './FriendRequestsScreen';

const tabRoutes = [
  {key: 'first', title: dict.friendRequests},
  {key: 'second', title: dict.yourFriends},
];

const renderScene = ({route, index}) => {
  switch (route.key) {
    case 'first':
      return <FriendRequestsScreens isFocused={index === 0} />;
    case 'second':
      return <YourFriendsScreen isFocused={index === 1} />;
  }
};

const FriendsTabs = () => {
  const opacity = useSharedValue(1);

  const [routes] = React.useState(tabRoutes);
  const [index, setIndex] = React.useState(0);
  const [showSearch, setShowSearch] = React.useState(false);

  //** ----- STYLES -----
  const iconAnimStyle = useAnimatedStyle(() => ({
    width: 18,
    height: 18,
    borderWidth: 0,
    borderRadius: 0,
    opacity: opacity.value,
    tintColor: Colors.appGreen,
  }));

  const labelAnimStyle = useAnimatedStyle(() => ({opacity: opacity.value}), []);

  const tabAnimStyle = useAnimatedStyle(
    () => ({flex: 1, opacity: opacity.value}),
    [],
  );

  //** ----- FUNCTIONS -----
  const renderTabBar = props => <FriendsTabbar {...props} />;

  const toggleIconOpacity = React.useCallback(() => {
    const toValue = opacity.value === 1 ? 0 : 1;
    const searchValue = showSearch ? false : true;

    opacity.value = withTiming(toValue, {duration: 50}, () => {
      runOnJS(setShowSearch)(searchValue);
    });
  }, [opacity, showSearch]);

  return (
    <>
      <Screen
        iconStyle={iconAnimStyle}
        customIcon={images.search}
        label={dict.profileFriends}
        labelStyle={labelAnimStyle}
        onIconPress={toggleIconOpacity}>
        <Animated.View style={tabAnimStyle}>
          <TabView
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            initialLayout={{width: WIDTH, height: 0}}
            renderScene={allRoutes => renderScene({...allRoutes, index})}
          />
        </Animated.View>
      </Screen>

      {showSearch && (
        <View style={StyleSheet.absoluteFill}>
          <SearchScreen onPressArrow={toggleIconOpacity} />
        </View>
      )}
    </>
  );
};

export default FriendsTabs;
