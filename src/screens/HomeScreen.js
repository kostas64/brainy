import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../components/common/Header';
import {DimensionsUtils} from '../utils/DimensionUtils';
import HomeGameCard from '../components/common/HomeGameCard';

const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Header insets={insets} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#c2f3ff',
        }}>
        <StatusBar
          translucent
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
        />
        <HomeGameCard
          onPress={() => navigation.navigate('MemoryCard')}
          image={require('../assets/images/memory_match.png')}
        />
        <View style={{marginVertical: DimensionsUtils.getDP(12)}} />
        <HomeGameCard
          onPress={() => navigation.navigate('ColorCard')}
          image={require('../assets/images/color_match.png')}
        />
      </View>
    </>
  );
};

export default HomeScreen;
