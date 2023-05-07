import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, StatusBar, StyleSheet, Animated, Platform} from 'react-native';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {DimensionsUtils} from '../utils/DimensionUtils';
import HomeGameCard from '../components/common/HomeGameCard';

const GamesScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const opacityRef = React.useRef(new Animated.Value(0.2)).current;

  React.useEffect(() => {
    Animated.timing(opacityRef, {
      toValue: 1,
      duration: Platform.OS === 'ios' ? 1000 : 350,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      route?.params?.backTransition();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header insets={insets} label={dict?.gamesScrTitle} />
      <Animated.View style={[styles.gamesContainer, {opacity: opacityRef}]}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={Colors.background}
        />
        <HomeGameCard
          onPress={() => navigation.navigate('MemoryCard')}
          image={require('../assets/images/memory_match.png')}
          label={dict.memoryCardsGameTitle}
        />
        <View style={styles.seperator} />
        <HomeGameCard
          onPress={() => navigation.navigate('ColorCard')}
          image={require('../assets/images/color_match.png')}
          label={dict.colorMatchGameTitle}
        />
        <View style={styles.seperator} />
        <HomeGameCard
          onPress={() => navigation.navigate('EqualMath')}
          image={require('../assets/images/match_equal.png')}
          label={dict.doTheMathGameTitle}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gamesContainer: {
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
