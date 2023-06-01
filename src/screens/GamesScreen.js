import {
  View,
  Animated,
  Platform,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import Header from '../components/common/Header';
import {DimensionsUtils} from '../utils/DimensionUtils';
import HomeGameCard from '../components/common/HomeGameCard';

const GamesScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const opacityRef = React.useRef(new Animated.Value(0.2)).current;

  const GAMES = [
    {
      label: dict.memoryCardsGameTitle,
      image: require('../assets/images/memory_match.png'),
      onPress: () => navigation.navigate('MemoryCard'),
    },
    {
      label: dict.colorMatchGameTitle,
      image: require('../assets/images/color_match.png'),
      onPress: () => navigation.navigate('ColorCard'),
    },
    {
      label: dict.doTheMathGameTitle,
      image: require('../assets/images/match_equal.png'),
      onPress: () => navigation.navigate('EqualMath'),
    },
    {
      label: dict.gestureItGameTitle,
      image: require('../assets/images/gesture_it.png'),
      onPress: () => navigation.navigate('GestureIt'),
    },
  ];

  const renderItem = ({item}) => (
    <HomeGameCard
      onPress={item?.onPress}
      image={item?.image}
      label={item?.label}
    />
  );

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
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.background}
      />
      <Header insets={insets} label={dict?.gamesScrTitle} />
      <Animated.View style={[styles.gamesContainer, {opacity: opacityRef}]}>
        <FlatList
          data={GAMES}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={<View style={styles.seperator} />}
          style={{
            marginBottom: DimensionsUtils.getDP(8),
            marginTop:
              insets.top > 0
                ? insets.top + DimensionsUtils.getDP(58)
                : DimensionsUtils.getDP(76),
          }}
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
  scrollContainer: {
    flexGrow: 1,
  },
  gamesContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  seperator: {
    marginVertical: DimensionsUtils.getDP(12),
  },
});

export default GamesScreen;
