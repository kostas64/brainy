/* eslint-disable no-shadow */
import {
  View,
  Text,
  Animated,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';

import {
  State,
  Directions,
  FlingGestureHandler,
} from 'react-native-gesture-handler';

import React from 'react';
import {Colors} from '../../utils/Colors';
import GamesListItem from './GamesListItem';
import {useNavigation} from '@react-navigation/native';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SPACING = DimensionsUtils.getDP(10);
const OVERFLOW_HEIGHT = DimensionsUtils.getDP(46);
const {width, height} = Dimensions.get('window');

const ITEM_HEIGHT =
  height <= 600 ? width * 0.88 : height <= 700 ? width : height * 0.6;

const OverflowItems = ({data, scrollXAnimated}) => {
  const inputRange = [-1, 0, 1];

  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.overflowItemContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.overflowItemContainerRow}>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const GamesList = ({
  data,
  index,
  setIndex,
  bestScores,
  scrollXIndex,
  loadingScores,
  setActiveIndex,
  scrollXAnimated,
}) => {
  const navigation = useNavigation();
  const [flinged, setFlinged] = React.useState(0);

  const onFlingLeft = React.useCallback(
    e => {
      if (e.nativeEvent.state === State.END) {
        if (index === data.length - 1) {
          setFlinged(0);
          return;
        }

        setIndex(oldInd => oldInd + 1);
        scrollXIndex.setValue(index + 1);
        setFlinged(0);
      } else if (e.nativeEvent.state === State.ACTIVE) {
        setFlinged(1);
      }
    },
    [index, data.length, scrollXIndex, setIndex],
  );

  const onFlingRight = React.useCallback(
    e => {
      if (e.nativeEvent.state === State.END) {
        if (index === 0) {
          setFlinged(0);
          return;
        }

        setActiveIndex(index - 1);
        setFlinged(0);
      } else if (e.nativeEvent.state === State.ACTIVE) {
        setFlinged(1);
      }
    },
    [index, setActiveIndex],
  );

  const cellRenderedComponent = ({item, index, children, style, ...props}) => {
    const newStyle = [style, {zIndex: data.length - index}];
    return (
      <View style={newStyle} index={index} {...props}>
        {children}
      </View>
    );
  };

  const getItemLayout = (_, index) => ({
    index,
    length: width * 0.76,
    offset: width * 0.76 * index,
  });

  const onItemPress = React.useCallback(
    item => {
      if (flinged === 0) {
        navigation.navigate(item.screen);
      }
    },
    [flinged, navigation],
  );

  const renderItem = React.useCallback(
    ({item, index}) => (
      <GamesListItem
        item={item}
        index={index}
        bestScores={bestScores}
        onItemPress={onItemPress}
        key={`game-list-${index}`}
        loadingScores={loadingScores}
        scrollXAnimated={scrollXAnimated}
      />
    ),
    [bestScores, loadingScores, scrollXAnimated, onItemPress],
  );

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={onFlingLeft}>
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={onFlingRight}>
        <View style={styles.container}>
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            inverted
            horizontal
            scrollEnabled={false}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            removeClippedSubviews={false}
            contentContainerStyle={styles.listContainer}
            CellRendererComponent={cellRenderedComponent}
            keyExtractor={(_, index) => String(index)}
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    height: ITEM_HEIGHT + SPACING * 2 + 4,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING * 2,
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
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
  overflowItemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowItemContainer: {
    height: OVERFLOW_HEIGHT,
    paddingHorizontal: SPACING * 3,
  },
});

export default GamesList;
