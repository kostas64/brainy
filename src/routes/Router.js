import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabStack from './TabRouter';
import ColorCardScreen from '../screens/ColorCardScreen';
import EqualMathScreen from '../screens/EqualMathScreen';
import MemoryCardScreen from '../screens/MemoryCardScreen';
import GetStartedScreen from '../screens/GetStartedScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          customAnimationOnGesture: true,
        }}>
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen
          name="GamesStack"
          component={TabStack}
          options={{
            animationDuration: 550,
            animation: 'fade_from_bottom',
            customAnimationOnGesture: true,
          }}
        />
        <Stack.Screen name="ColorCard" component={ColorCardScreen} />
        <Stack.Screen name="MemoryCard" component={MemoryCardScreen} />
        <Stack.Screen name="EqualMath" component={EqualMathScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
