import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';

const RankScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Header insets={insets} label={dict.rankScrTitle} />
      <Text>RankScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default RankScreen;
