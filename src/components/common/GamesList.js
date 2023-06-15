import {
  View,
  Text,
  Animated,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  State,
  Directions,
  FlingGestureHandler,
} from 'react-native-gesture-handler';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {AuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const {width} = Dimensions.get('window');
const AnimPressable = Animated.createAnimatedComponent(Pressable);

const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const SPACING = DimensionsUtils.getDP(10);
const OVERFLOW_HEIGHT = DimensionsUtils.getDP(72);

const OverflowItems = ({data, bestScores, scrollXAnimated}) => {
  const inputRange = [-1, 0, 1];

  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{transform: [{translateY}]}}>
        {data.map((item, index) => {
          const ms = bestScores[item.title]?.[0]?.milliseconds;
          const points = bestScores[item.title]?.[0]?.points;
          const scoreLabel = `Best: ${`${
            !!ms ? `${ms} ms` : `${points} points`
          }`}`;

          return (
            <View key={index} style={styles.overflowItemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.overflowItemContainerRow}>
                <Text style={[styles.description]}>{item.description}</Text>
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
  const {user} = React.useContext(AuthContext);

  const onFlingLeft = e => {
    if (e.nativeEvent.state === State.END) {
      if (index === data.length - 1) return;

      setIndex(oldInd => oldInd + 1);
      scrollXIndex.setValue(index + 1);
    }
  };

  const onFlingRight = ev => {
    if (ev.nativeEvent.state === State.END) {
      if (index === 0) {
        return;
      }
      setActiveIndex(index - 1);
    }
  };

  const cellRenderedComponent = ({item, index, children, style, ...props}) => {
    const newStyle = [style, {zIndex: data.length - index}];
    return (
      <View style={newStyle} index={index} {...props}>
        {children}
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    const inputRange = [index - 1, index, index + 1];

    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [50, 0, -width],
    });

    const scale = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [0.8, 1, 1.3],
    });

    const opacity = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [1 - 2 / VISIBLE_ITEMS, 1, 0],
    });

    const ms = bestScores[item.title]?.[0]?.milliseconds;
    const points = bestScores[item.title]?.[0]?.points;
    const scoreLabel = `Best: ${`${!!ms ? `${ms} ms` : `${points} points`}`}`;

    return (
      <AnimPressable
        onPress={item?.onPress}
        style={[
          styles.cardContainer,
          {
            opacity,
            transform: [
              {
                translateX,
              },
              {scale},
            ],
          },
        ]}>
        <FastImage source={item.poster} style={styles.image} />
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
          <OverflowItems
            data={data}
            bestScores={bestScores}
            scrollXAnimated={scrollXAnimated}
          />
          <FlatList
            data={data}
            inverted
            horizontal
            scrollEnabled={false}
            removeClippedSubviews={false}
            contentContainerStyle={styles.listContainer}
            CellRendererComponent={cellRenderedComponent}
            keyExtractor={(_, index) => String(index)}
            renderItem={renderItem}
          />
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DimensionsUtils.getDP(8),
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: SPACING * 2,
  },
  title: {
    color: Colors.tabBarIcon,
    textTransform: 'uppercase',
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(22),
  },
  description: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(16),
  },
  date: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(14),
  },
  cardContainer: {
    position: 'absolute',
    left: -ITEM_WIDTH / 2,
    borderColor: Colors.tabBarIcon,
    borderRadius: DimensionsUtils.getDP(20),
    borderWidth: DimensionsUtils.getDP(3),
  },
  scoreContainer: {
    position: 'absolute',
    left: DimensionsUtils.getDP(16),
    top: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarIcon,
    padding: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(8),
  },
  score: {
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
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
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: DimensionsUtils.getDP(16),
  },
});

export default GamesList;
