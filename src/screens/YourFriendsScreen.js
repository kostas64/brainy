/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {HEIGHT} from '../utils/GenericUtils';
import dict from '../assets/values/dict.json';
import {getAllFriends} from '../services/friends';
import Skeleton from '../components/skeleton/Skeleton';
import {DimensionsUtils} from '../utils/DimensionUtils';
import FriendsListItem from '../components/friends/FriendsListItem';

const ItemSeparator = () => {
  return <View style={styles.height} />;
};

const YourFriendsScreen = ({isFocused}) => {
  const insets = useSafeAreaInsets();

  const [friends, setFriends] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  //** ----- STYLES -----
  const listHeight =
    HEIGHT - insets.bottom - 16 - (insets.top > 0 ? insets.top : 24);

  //** ----- FUNCTIONS -----
  const ListHeader = React.useCallback(() => {
    if (friends.length === 0) {
      return null;
    }

    return <Text style={styles.label}>{dict.yourFriends}</Text>;
  }, [friends]);

  const ListEmpty = React.useCallback(() => {
    if (loading) {
      return null;
    }

    return <Text style={styles.label}>{dict.noFriendsYet}</Text>;
  }, [loading]);

  const renderItem = React.useCallback(
    ({item, index}) => (
      <FriendsListItem item={item} key={`friend-request-${index}`} />
    ),
    [],
  );

  const listFriends = React.useCallback(() => {
    getAllFriends()
      .then(data => setFriends(data))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [loading]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (isFocused) {
      listFriends();
    } else {
      setLoading(true);
    }
  }, [isFocused]);

  return (
    <Skeleton
      type={'friends'}
      loading={loading}
      skeletonStyle={styles.skeletonStyle}>
      <View style={[styles.listContainer, {height: listHeight}]}>
        <FlashList
          data={friends}
          estimatedItemSize={100}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          contentContainerStyle={styles.spaceBottom}
        />
      </View>
    </Skeleton>
  );
};

export default YourFriendsScreen;

const styles = StyleSheet.create({
  label: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    marginVertical: DimensionsUtils.getDP(10),
    fontSize: DimensionsUtils.getFontSize(18),
  },
  skeletonStyle: {
    marginLeft: DimensionsUtils.getDP(16),
    marginTop: DimensionsUtils.getDP(16),
  },
  spaceBottom: {
    paddingBottom: 72,
  },
  height: {
    height: DimensionsUtils.getDP(24),
  },
  listContainer: {
    marginTop: DimensionsUtils.getDP(16),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
});
