import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MyProfile from '../screens/MyProfile';
import RankScreen from '../screens/RankScreen';
import TabBar from '../components/common/TabBar';
import GamesScreen from '../screens/GamesScreen';

const Tab = createBottomTabNavigator();

const Tabs = props => <TabBar {...props} />;

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={Tabs}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Rank" component={RankScreen} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
};

export default TabStack;
