import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Colors} from '../utils/Colors';

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();

  React.useEffect(() => {
    isFocused && navigation.getParent()?.setOptions({gestureEnabled: false});
  }, [isFocused, navigation]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.background}}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
