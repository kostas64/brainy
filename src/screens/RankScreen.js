import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {AuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';

const RankScreen = () => {
  const insets = useSafeAreaInsets();
  const {user} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24),
        }}>
        <Header
          insets={insets}
          label={dict.rankScrTitle}
          avatar={user?.avatar}
        />
      </View>
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
