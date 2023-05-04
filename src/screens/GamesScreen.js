import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../components/common/Header';
import {DimensionsUtils} from '../utils/DimensionUtils';
import HomeGameCard from '../components/common/HomeGameCard';

const GamesScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Header insets={insets} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
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
        <View style={{marginVertical: DimensionsUtils.getDP(12)}} />
        <HomeGameCard
          onPress={() => navigation.navigate('ColorCard')}
          image={require('../assets/images/color_match.jpg')}
          label={'Color Match'}
        />
        <View style={{marginVertical: DimensionsUtils.getDP(12)}} />
        <HomeGameCard
          onPress={() => navigation.navigate('EqualMath')}
          image={require('../assets/images/match_equal.png')}
          label={'Equal Math'}
        />
      </View>
    </>
  );
};

export default GamesScreen;