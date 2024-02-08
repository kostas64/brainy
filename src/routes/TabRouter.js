import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import RankScreen from '../screens/RankScreen';
import TabBar from '../components/common/TabBar';
import GamesScreen from '../screens/GamesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Rank" component={RankScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabStack;
