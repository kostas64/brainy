import {
  Text,
  View,
  Image,
  Animated,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {HEIGHT, WIDTH} from '../../utils/GenericUtils';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const VISIBLE_ITEMS = 3;

const ITEM_WIDTH = HEIGHT <= 700 ? (WIDTH * 0.88) / 1.4 : WIDTH * 0.75;
const ITEM_HEIGHT =
  HEIGHT <= 600 ? WIDTH * 0.88 : HEIGHT <= 700 ? WIDTH : HEIGHT * 0.6;

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const GamesListItem = ({
  item,
  index,
  bestScores,
  onItemPress,
  loadingScores,
  scrollXAnimated,
}) => {
  const {user} = useAuthContext();

  const inputRange = [index - 1, index, index + 1];

  //** ----- STYLES -----
  const translateX = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [50, 0, -WIDTH],
  });

  const scale = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [0.8, 1, 1],
  });

  const opacity = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [1 - 2 / VISIBLE_ITEMS, 1, 0],
  });

  const ms = bestScores[item.title]?.[0]?.milliseconds;
  const points = bestScores[item.title]?.[0]?.points;
  const scoreLabel = `Best: ${`${
    ms
      ? `${ms / 1000}s (${bestScores[item.title]?.[0]?.flips} flips)`
      : `${points} points (${bestScores[item.title]?.[0]?.correctness}%)`
  }`}`;

  return (
    <AnimPressable
      onPress={() => onItemPress(item)}
      style={[
        styles.cardContainer,
        {opacity, transform: [{translateX}, {scale}]},
      ]}>
      <Image source={item.poster} style={styles.image} />
      {user?.isGuest ? null : (
        <View style={styles.scoreContainer}>
          {loadingScores ? (
            <ActivityIndicator size={'small'} color={Colors.tabBarBg} />
          ) : (
            <Text style={styles.score}>
              {!!ms || !!points ? scoreLabel : dict?.gamesNoScore}
            </Text>
          )}
        </View>
      )}
    </AnimPressable>
  );
};

export default GamesListItem;

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    left: -ITEM_WIDTH / 2,
    borderColor: Colors.tabBarIcon,
    borderRadius: DimensionsUtils.getDP(20),
    borderWidth: DimensionsUtils.getDP(2),
  },
  scoreContainer: {
    position: 'absolute',
    left: DimensionsUtils.getDP(16),
    top: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarIcon,
    padding: DimensionsUtils.getDP(6),
    borderRadius: DimensionsUtils.getDP(8),
  },
  score: {
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    height: 20,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: DimensionsUtils.getDP(18),
  },
});
