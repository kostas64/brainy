/* eslint-disable react-hooks/rules-of-hooks */
import Animated, {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../utils/Colors';
import GamesListItem from './GamesListItem';
import WidePagination from './WidePagination';
import {HEIGHT, WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SPACING = DimensionsUtils.getDP(10);
const OVERFLOW_HEIGHT = DimensionsUtils.getDP(46);

const ITEM_HEIGHT =
  HEIGHT <= 600 ? WIDTH * 0.88 : HEIGHT <= 700 ? WIDTH : HEIGHT * 0.6;

const OverflowItems = ({data, scrollX}) => {
  return (
    <View style={styles.overflowContainer}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * (WIDTH / 2),
          index * (WIDTH / 2),
          (index + 1) * (WIDTH / 2),
        ];

        const outputRange = [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT];

        const translateYStyle = useAnimatedStyle(() => ({
          transform: [
            {translateY: interpolate(scrollX.value, inputRange, outputRange)},
          ],
        }));

        return (
          <Animated.View
            key={index}
            style={[styles.overflowItemContainer, translateYStyle]}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.overflowItemContainerRow}>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

const GamesList = ({data, bestScores, loadingScores, getBestOfScores}) => {
  const scrollX = useSharedValue(0);
  const navigation = useNavigation();

  //** ----- FUNCTIONS -----
  const getItemLayout = (_, index) => ({
    index,
    length: WIDTH,
    offset: WIDTH * index,
  });

  const onItemPress = React.useCallback(
    item =>
      navigation.navigate(item.screen, {
        update: () => getBestOfScores(),
      }),
    [navigation, getBestOfScores],
  );

  const renderItem = React.useCallback(
    ({item, index}) => (
      <GamesListItem
        item={item}
        index={index}
        scrollX={scrollX}
        bestScores={bestScores}
        onItemPress={onItemPress}
        key={`game-list-${index}`}
        loadingScores={loadingScores}
      />
    ),
    [bestScores, loadingScores, scrollX, onItemPress],
  );

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View style={styles.container} accessible>
      <OverflowItems data={data} scrollX={scrollX} />
      <Animated.FlatList
        data={data}
        horizontal
        accessible
        pagingEnabled
        onScroll={onScroll}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContainer}
      />
      <WidePagination
        x={scrollX}
        width={WIDTH}
        steps={data.length}
        color={Colors.appGreen}
        containerStyle={styles.bottomCenter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    height: ITEM_HEIGHT + SPACING * 2 + 4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    height: 22,
    color: Colors.tabBarIcon,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(18),
  },
  description: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(16),
  },
  overflowContainer: {
    alignSelf: 'center',
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
    top: DimensionsUtils.getDP(32),
  },
  overflowItemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowItemContainer: {
    height: OVERFLOW_HEIGHT,
  },
  bottomCenter: {
    alignSelf: 'center',
    bottom: DimensionsUtils.getDP(24),
  },
});

export default React.memo(GamesList);
