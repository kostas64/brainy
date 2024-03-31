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
import {msToMMSSmmm} from '../../utils/StringUtils';
import {HEIGHT, WIDTH} from '../../utils/GenericUtils';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ITEM_WIDTH = HEIGHT <= 700 ? (WIDTH * 0.88) / 1.4 : WIDTH * 0.75;
const ITEM_HEIGHT =
  HEIGHT <= 600 ? WIDTH * 0.88 : HEIGHT <= 700 ? WIDTH : HEIGHT * 0.6;

const AnimPressable = Animated.createAnimatedComponent(Pressable);

const GamesListItem = ({
  item,
  index,
  scrollX,
  bestScores,
  onItemPress,
  loadingScores,
}) => {
  const {user} = useAuthContext();

  const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
  });

  const ms = bestScores[item.title]?.[0]?.milliseconds;
  const points = bestScores[item.title]?.[0]?.points;
  const hasFlips = bestScores[item.title]?.[0]?.flips;
  const hasPoints = bestScores[item.title]?.[0]?.points;
  const time = msToMMSSmmm(ms);

  const scoreUnit = hasFlips
    ? `${hasFlips} flips`
    : hasPoints
    ? `${hasPoints} points`
    : '';

  const scoreLabel = `Best: ${`${
    ms
      ? `${time} (${scoreUnit})`
      : `${points} points (${bestScores[item.title]?.[0]?.correctness}%)`
  }`}`;

  return (
    <View style={styles.gameContainer} acceessible>
      <AnimPressable
        testID={`card-${index}`}
        onPress={() => onItemPress(item)}
        style={[styles.cardContainer, {transform: [{scale}]}]}>
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
    </View>
  );
};

export default GamesListItem;

const styles = StyleSheet.create({
  gameContainer: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderColor: Colors.tabBarIcon,
    borderRadius: DimensionsUtils.getDP(20),
    borderWidth: DimensionsUtils.getDP(2),
  },
  scoreContainer: {
    height: 28,
    position: 'absolute',
    left: DimensionsUtils.getDP(16),
    top: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarIcon,
    padding: DimensionsUtils.getDP(6),
    borderRadius: DimensionsUtils.getDP(8),
  },
  score: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  image: {
    borderRadius: DimensionsUtils.getDP(18),
    width: ITEM_WIDTH - DimensionsUtils.getDP(4),
    height: ITEM_HEIGHT - DimensionsUtils.getDP(4),
  },
});
