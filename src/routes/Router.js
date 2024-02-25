import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabStack from './TabRouter';
import {Colors} from '../utils/Colors';
import FriendsTabs from '../screens/FriendsTabs';
import AccountScreen from '../screens/AccountScreen';
import EqualMathScreen from '../screens/EqualMathScreen';
import GestureItScreen from '../screens/GestureItScreen';
import ColorCardScreen from '../screens/ColorCardScreen';
import MemoryCardScreen from '../screens/MemoryCardScreen';
import GetStartedScreen from '../screens/GetStartedScreen';

const Stack = createNativeStackNavigator();

const navigatorScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
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
    <NavigationContainer
      onReady={onNavigationReady}
      theme={{colors: {background: Colors.background}}}>
      <Stack.Navigator screenOptions={navigatorScreenOptions}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen
          name="GamesStack"
          component={TabStack}
          options={gameStackOptions}
        />
        <Stack.Group screenOptions={{gestureEnabled: true}}>
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
            name="FriendsTabs"
            component={FriendsTabs}
            options={screenSlideConfig}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
