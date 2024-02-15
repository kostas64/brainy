import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import images from '../assets/images/images';
import {HEIGHT} from '../utils/GenericUtils';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import Skeleton from '../components/common/Skeleton';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getAllFriends, getAllFriendsRequest} from '../services/friends';
import FriendRequestItem from '../components/friendRequest/FriendRequestItem';

const ItemSeparator = () => {
  return <View style={styles.height} />;
};

const FriendsScreens = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [friends, setFriends] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const listHeight =
    HEIGHT - insets.bottom - 16 - (insets.top > 0 ? insets.top : 24);

  //** ----- FUNCTIONS -----
  const ListHeader = React.useCallback(() => {
    if (requests.length === 0) {
      return null;
    }

    return <Text style={styles.label}>{dict.friendRequests}</Text>;
  }, [requests]);

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
    return new Promise((resolve, reject) => {
      getAllFriendsRequest()
        .then(data => resolve(data))
        .catch(reject);
    });
  }, []);

  const listFriends = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      getAllFriends()
        .then(data => resolve(data))
        .catch(reject);
    });
  }, []);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    Promise.all([getRequests(), listFriends()])
      .then(([res1, res2]) => {
        setRequests(res1);
        setFriends(res2);
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 500),
      );
  }, [getRequests, listFriends]);

  return (
    <Screen
      navigation={navigation}
      customIcon={images.search}
      label={dict.profileFriends}
      iconStyle={styles.searchIcon}>
      <Skeleton loading={loading} skeletonStyle={styles.skeletonStyle}>
        <View style={[styles.listContainer, {height: listHeight}]}>
          <FlashList
            data={requests}
            estimatedItemSize={100}
            renderItem={renderItem}
            ListHeaderComponent={ListHeader}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.spaceBottom}
          />
        </View>
      </Skeleton>

      {/* TO-DO Implement Friends list  */}
    </Screen>
  );
};

export default FriendsScreens;

const styles = StyleSheet.create({
  searchIcon: {
    borderRadius: 0,
    borderWidth: 0,
    tintColor: Colors.appGreen,
    width: DimensionsUtils.getDP(20),
    height: DimensionsUtils.getDP(20),
  },
  label: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    marginVertical: DimensionsUtils.getDP(10),
    fontSize: DimensionsUtils.getFontSize(20),
  },
  skeletonStyle: {
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
    marginHorizontal: DimensionsUtils.getDP(24),
  },
});
