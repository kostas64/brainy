import React from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import Header from '../components/common/Header';
import {DimensionsUtils} from '../utils/DimensionUtils';
import HomeGameCard from '../components/common/HomeGameCard';

const GamesScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Header insets={insets} />
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle={'light-content'}
          backgroundColor={'transparent'}
        />
        <HomeGameCard
          onPress={() => navigation.navigate('MemoryCard')}
          image={require('../assets/images/memory_match.png')}
          label={'Memory Cards'}
        />
        <View style={styles.seperator} />
        <HomeGameCard
          onPress={() => navigation.navigate('ColorCard')}
          image={require('../assets/images/color_match.png')}
          label={'Color Match'}
        />
        <View style={styles.seperator} />
        <HomeGameCard
          onPress={() => navigation.navigate('EqualMath')}
          image={require('../assets/images/match_equal.png')}
          label={'Equal Math'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  seperator: {
    marginVertical: DimensionsUtils.getDP(12),
  },
});

export default GamesScreen;
