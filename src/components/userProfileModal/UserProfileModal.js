import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import {
  areWeFriends,
  getFriendsRequest,
  sendFriendsRequest,
  cancelFriendsRequest,
} from '../../services/friends';
import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {capFirstLet} from '../../utils/StringUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {getBestOfScoresForUser} from '../../services/score';
import UserProfileModalAvatar from './UserProfileModalAvatar';
import UserProfileModalScoreItem from './UserProfileModalScoreItem';
import UserProfileModalFooterButtons from './UserProfileModalFooterButtons';

const Loader = () => (
  <View style={styles.indicatorContainer}>
    <ActivityIndicator size={'small'} color={Colors.appGreen} />
  </View>
);

const UserProfileModal = ({isMe, item}) => {
  const [scores, setScores] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [hasRequest, setHasRequest] = React.useState(false);
  const [hasFriendship, setHasFriendship] = React.useState(false);

  const user = item?.user?.[0];
  const name = `${capFirstLet(user?.name)} ${capFirstLet(user?.surname)}`;

  const firstLabelButton =
    !hasRequest && !hasFriendship
      ? dict.addFriend
      : hasRequest
      ? dict.cancelRequest
      : dict.removeFriend;

  const firstButtonIcon =
    !hasRequest && !hasFriendship
      ? images.addUser
      : hasFriendship
      ? images.deleteUser
      : null;

  const renderItem = React.useCallback(
    game => (
      <UserProfileModalScoreItem
        key={`game-score-${game.index}`}
        item={game.item}
      />
    ),
    [],
  );

  const getScores = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      getBestOfScoresForUser(user?._id)
        .then(async res => {
          const data = await res.json();

          setScores(data);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }, [user?._id]);

  const getFriendship = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      areWeFriends(user?._id)
        .then(async res => {
          const response = await res.json();
          resolve(response);
        })
        .catch(reject);
    });
  }, [user?._id]);

  const checkFriendRequest = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      getFriendsRequest(user?._id)
        .then(async res => {
          const response = await res.json();
          resolve(response);
        })
        .catch(reject);
    });
  }, [user?._id]);

  const onPressFirstButton = React.useCallback(() => {
    if (hasFriendship) {
      //Delete friends
    } else if (hasRequest) {
      //Cancel Request
      setLoadingButton(true);
      cancelFriendsRequest(user?._id)
        .then(() => {
          setLoadingButton(false);
          setHasRequest(false);
        })
        .catch(() => {
          setLoadingButton(false);
        });
    } else {
      //Send friend Request
      setLoadingButton(true);
      sendFriendsRequest(user?._id)
        .then(() => {
          setLoadingButton(false);
          setHasRequest(true);
        })
        .catch(() => {
          setLoadingButton(false);
        });
    }
  }, [user?._id, hasFriendship, hasRequest]);

  React.useEffect(() => {
    Promise.all([getScores(), getFriendship(), checkFriendRequest()]).then(
      ([_, res2, res3]) => {
        res2 && setHasFriendship(true);
        !res2 && res3 && setHasRequest(true);
        setLoading(false);
      },
    );
  }, [getScores, getFriendship, checkFriendRequest]);

  return (
    <View>
      <UserProfileModalAvatar name={name} user={user} />

      {loading && <Loader />}

      {!loading && (
        <Animated.View entering={FadeInDown.duration(500)}>
          <FlatList
            horizontal
            data={scores}
            renderItem={renderItem}
            style={styles.listStyle}
            showsHorizontalScrollIndicator={false}
          />
          <UserProfileModalFooterButtons
            isMe={isMe}
            firstLabel={firstLabelButton}
            loadingButton={loadingButton}
            firstButtonIcon={firstButtonIcon}
            onPressFirstButton={onPressFirstButton}
            onPressSecondButton={() => {}}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default UserProfileModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: DimensionsUtils.getDP(16),
  },
  listStyle: {
    paddingVertical: DimensionsUtils.getDP(10),
    marginBottom: DimensionsUtils.getDP(24),
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  indicatorContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
