import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabStack from './TabRouter';
import ColorCardScreen from '../screens/ColorCardScreen';
import EqualMathScreen from '../screens/EqualMathScreen';
import MemoryCardScreen from '../screens/MemoryCardScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import GestureItScreen from '../screens/GestureItScreen';

const Stack = createNativeStackNavigator();

const screenConfig = {
  animation: 'fade',
  customAnimationOnGesture: true,
};

const Router = ({onNavigationReady}) => {
  return (
    <NavigationContainer onReady={onNavigationReady}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'pop',
        }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen
          name="GamesStack"
          component={TabStack}
          options={{
            animationDuration: 550,
            animation: 'fade',
            customAnimationOnGesture: true,
          }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
