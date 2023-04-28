import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabStack from './TabRouter';
import ColorCardScreen from '../screens/ColorCardScreen';
import MemoryCardScreen from '../screens/MemoryCardScreen';

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
        <Stack.Screen name="GamesStack" component={TabStack} />
        <Stack.Screen name="ColorCard" component={ColorCardScreen} />
        <Stack.Screen name="MemoryCard" component={MemoryCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
