/* eslint-disable no-shadow */
import {
  View,
  Text,
  Image,
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
import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {AuthContext} from '../../context/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const SPACING = DimensionsUtils.getDP(10);
const OVERFLOW_HEIGHT = DimensionsUtils.getDP(46);
const {width, height} = Dimensions.get('window');
const AnimPressable = Animated.createAnimatedComponent(Pressable);

const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = height <= 700 ? (width * 0.88) / 1.4 : width * 0.75;
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
  const {user} = React.useContext(AuthContext);
  const [flinged, setFlinged] = React.useState(0);

  const onFlingLeft = e => {
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
  };

  const onFlingRight = e => {
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
  };

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

  const renderItem = ({item, index}) => {
    const inputRange = [index - 1, index, index + 1];

    const translateX = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [50, 0, -width],
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
    borderRadius: DimensionsUtils.getDP(18),
  },
});

export default GamesList;
