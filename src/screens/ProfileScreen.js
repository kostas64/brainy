import React from 'react';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: false});
  }, [isFocused, navigation]);

  return (
    <Screen label={dict.profileScrTitle} navigation={navigation} noIcon>
      {/* TO DO  */}
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
