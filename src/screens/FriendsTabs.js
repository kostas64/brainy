import React from 'react';
import {StyleSheet} from 'react-native';
import {TabView} from 'react-native-tab-view';

import {Colors} from '../utils/Colors';
import {WIDTH} from '../utils/GenericUtils';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import YourFriendsScreen from './YourFriendsScreen';
import {DimensionsUtils} from '../utils/DimensionUtils';
import FriendsTabbar from '../components/FriendsTabbar';
import FriendRequestsScreens from './FriendRequestsScreen';

const renderScene = ({route, index}) => {
  switch (route.key) {
    case 'first':
      return <FriendRequestsScreens isFocused={index === 0} />;
    case 'second':
      return <YourFriendsScreen isFocused={index === 1} />;
  }
};

const FriendsTabs = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: dict.friendRequests},
    {key: 'second', title: dict.yourFriends},
  ]);

  const renderTabBar = props => <FriendsTabbar {...props} />;

  return (
    <Screen
      navigation={navigation}
      customIcon={images.search}
      label={dict.profileFriends}
      iconStyle={styles.searchIcon}>
      <TabView
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        initialLayout={{width: WIDTH, height: 0}}
        renderScene={allRoutes => renderScene({...allRoutes, index})}
      />
    </Screen>
  );
};

export default FriendsTabs;

const styles = StyleSheet.create({
  searchIcon: {
    borderRadius: 0,
    borderWidth: 0,
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(20),
    height: DimensionsUtils.getDP(20),
  },
});
