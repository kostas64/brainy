import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabStack from './TabRouter';
import {Colors} from '../utils/Colors';
import {useStorage} from '../hooks/useStorage';
import FriendsTabs from '../screens/FriendsTabs';
import AccountScreen from '../screens/AccountScreen';
import InspireScreen from '../screens/InspireScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EqualMathScreen from '../screens/EqualMathScreen';
import GestureItScreen from '../screens/GestureItScreen';
import ColorCardScreen from '../screens/ColorCardScreen';
import PickAvatarScreen from '../screens/PickAvatarScreen';
import MemoryCardScreen from '../screens/MemoryCardScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import BallBalanceScreen from '../screens/BallBalanceScreen';
import SetNicknameScreen from '../screens/SetNicknameScreen';
import EditAccountScreen from '../screens/EditAccountScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

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
  const [showOnboarding, set] = useStorage('oboarding', true);
  const initialScreen = showOnboarding ? 'Onboarding' : 'GetStarted';

  return (
    <NavigationContainer
      onReady={onNavigationReady}
      theme={{colors: {background: Colors.background}}}>
      <Stack.Navigator
        initialRouteName={initialScreen}
        screenOptions={navigatorScreenOptions}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="SetNickname"
          component={SetNicknameScreen}
          options={gameStackOptions}
        />
        <Stack.Screen
          name="PickAvatar"
          component={PickAvatarScreen}
          options={screenSlideConfig}
        />
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
          name="BallBalance"
          component={BallBalanceScreen}
          options={screenConfig}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="EditAccount"
          component={EditAccountScreen}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="FriendsTabs"
          component={FriendsTabs}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={screenSlideConfig}
        />
        <Stack.Screen
          name="Inspire"
          component={InspireScreen}
          options={screenSlideConfig}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
