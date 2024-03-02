/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {HEIGHT} from '../utils/GenericUtils';
import dict from '../assets/values/dict.json';
import Skeleton from '../components/skeleton/Skeleton';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getAllFriendsRequest} from '../services/friends';
import FriendRequestItem from '../components/friendRequest/FriendRequestItem';

const ItemSeparator = () => {
  return <View style={styles.height} />;
};

const FriendRequestsScreens = ({isFocused}) => {
  const insets = useSafeAreaInsets();

  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  //** ----- STYLES -----
  const listHeight =
    HEIGHT - insets.bottom - 16 - (insets.top > 0 ? insets.top : 24);

  //** ----- FUNCTIONS -----
  const ListHeader = React.useCallback(() => {
    if (requests.length === 0) {
      return null;
    }

    return <Text style={styles.label}>{dict.friendRequests}</Text>;
  }, [requests]);

  const ListEmpty = React.useCallback(() => {
    if (loading) {
      return null;
    }

    return <Text style={styles.label}>{dict.noFriendRequests}</Text>;
  }, [loading]);

  const updateList = React.useCallback(
    req => {
      const filteredRequests = requests.filter(item => item._id !== req._id);

      setRequests(filteredRequests);
    },
    [requests],
  );

  const renderItem = React.useCallback(
    ({item, index}) => (
      <FriendRequestItem
        item={item}
        updateList={updateList}
        key={`friend-request-${index}`}
      />
    ),
    [updateList],
  );

  const getRequests = React.useCallback(() => {
    getAllFriendsRequest()
      .then(data => setRequests(data))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [loading]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (isFocused) {
      getRequests();
    } else {
      setLoading(true);
    }
  }, [isFocused]);

  return (
    <Skeleton
      type={'friendReq'}
      loading={loading}
      skeletonStyle={styles.skeletonStyle}>
      <View style={[styles.listContainer, {height: listHeight}]}>
        <FlashList
          data={requests}
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

export default FriendRequestsScreens;

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
