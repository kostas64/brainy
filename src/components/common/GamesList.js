import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Animated, StyleSheet} from 'react-native';

import Pagination from './Pagination';
import {Colors} from '../../utils/Colors';
import GamesListItem from './GamesListItem';
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

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
        });

        return (
          <Animated.View
            key={index}
            style={[styles.overflowItemContainer, {transform: [{translateY}]}]}>
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

const GamesList = ({data, bestScores, loadingScores}) => {
  const navigation = useNavigation();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  //** ----- FUNCTIONS -----
  const getItemLayout = (_, index) => ({
    index,
    length: WIDTH,
    offset: WIDTH * index,
  });

  const onItemPress = React.useCallback(
    item => navigation.navigate(item.screen),
    [navigation],
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

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: true},
  );

  return (
    <View style={styles.container}>
      <OverflowItems data={data} scrollX={scrollX} />
      <Animated.FlatList
        data={data}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContainer}
      />
      <Pagination scrollX={scrollX} dotsLength={data.length} />
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
});

export default GamesList;
