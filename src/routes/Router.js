import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabStack from './TabRouter';
import AccountScreen from '../screens/AccountScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ColorCardScreen from '../screens/ColorCardScreen';
import EqualMathScreen from '../screens/EqualMathScreen';
import GestureItScreen from '../screens/GestureItScreen';
import MemoryCardScreen from '../screens/MemoryCardScreen';
import GetStartedScreen from '../screens/GetStartedScreen';

const Stack = createNativeStackNavigator();

const navigatorScreenOptions = {
  headerShown: false,
  animationTypeForReplace: 'pop',
};

const screenConfig = {
  animation: 'fade',
  customAnimationOnGesture: true,
};

const screenSlideConfig = {
  animation: 'slide_from_right',
};

const gameStackOptions = {
  animationDuration: 550,
  animation: 'fade',
  customAnimationOnGesture: true,
};

const Router = ({onNavigationReady}) => {
  return (
    <NavigationContainer onReady={onNavigationReady}>
      <Stack.Navigator screenOptions={navigatorScreenOptions}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen
          name="GamesStack"
          component={TabStack}
          options={gameStackOptions}
        />
        <Stack.Screen
          name="ColorCard"
          component={ColorCardScreen}
          options={screenConfig}
        />
        <Stack.Screen
          name="MemoryCard"
          component={MemoryCardScreen}
          options={screenConfig}
        />
        <Stack.Screen
          name="EqualMath"
          component={EqualMathScreen}
          options={screenConfig}
        />
        <Stack.Screen
          name="GestureIt"
          component={GestureItScreen}
          options={screenConfig}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
          options={screenSlideConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
