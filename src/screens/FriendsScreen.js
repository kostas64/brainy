import React from 'react';
import {StyleSheet} from 'react-native';

import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';

const FriendsScreens = ({navigation}) => {
  return (
    <Screen label={dict.profileFriends} navigation={navigation} noIcon></Screen>
  );
};

export default FriendsScreens;

const styles = StyleSheet.create({});
