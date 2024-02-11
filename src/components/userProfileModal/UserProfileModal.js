import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import {
  areWeFriends,
  deleteFriend,
  getFriendsRequest,
  sendFriendsRequest,
  acceptFriendsRequest,
  cancelFriendsRequest,
} from '../../services/friends';
import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {capFirstLet} from '../../utils/StringUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {getBestOfScoresForUser} from '../../services/score';
import {useToastContext} from '../../context/ToastProvider';
import UserProfileModalAvatar from './UserProfileModalAvatar';
import UserProfileModalScoreItem from './UserProfileModalScoreItem';
import UserProfileModalFooterButtons from './UserProfileModalFooterButtons';

const Loader = () => (
  <View style={styles.indicatorContainer}>
    <ActivityIndicator size={'small'} color={Colors.appGreen} />
  </View>
);

const UserProfileModal = ({isMe, item, onGamePress}) => {
  const {setToast} = useToastContext();

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
      : hasRequest === 'Accept'
      ? dict.acceptRequest
      : hasRequest === 'Cancel'
      ? dict.cancelRequest
      : dict.removeFriend;

  const secondLabelButton =
    !hasRequest || hasRequest === 'Cancel'
      ? dict.viewProfile
      : dict.rejectRequest;

  const firstButtonIcon =
    !hasRequest && !hasFriendship
      ? images.addUser
      : hasFriendship
      ? images.deleteUser
      : null;

  const renderItem = React.useCallback(
    game => (
      <UserProfileModalScoreItem
        item={game.item}
        onGamePress={onGamePress}
        key={`game-score-${game.index}`}
      />
    ),
    [onGamePress],
  );

  const getScores = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      getBestOfScoresForUser(user?._id)
        .then(data => {
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
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });
  }, [user?._id]);

  const checkFriendRequest = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      getFriendsRequest(user?._id)
        .then(data => {
          resolve(data);
        })
        .catch(reject);
    });
  }, [user?._id]);

  const onPressFirstButton = React.useCallback(() => {
    setLoadingButton(true);

    if (hasFriendship) {
      //Delete friend
      deleteFriend(user?._id)
        .then(() => {
          setToast({
            message: dict.deleteFriend,
            icon: {uri: user?.avatar},
          });

          setHasRequest(false);
          setHasFriendship(false);
        })
        .finally(() => setLoadingButton(false));
    } else if (hasRequest === 'Accept') {
      //Accept Request
      acceptFriendsRequest(user?._id)
        .then(() => {
          setToast({
            message: dict.acceptedRequest,
            icon: {uri: user?.avatar},
          });

          setHasRequest(false);
          setHasFriendship(true);
        })
        .finally(() => setLoadingButton(false));
    } else if (hasRequest === 'Cancel') {
      //Cancel Request
      cancelFriendsRequest(user?._id)
        .then(() => {
          setHasRequest(false);
        })
        .finally(() => setLoadingButton(false));
    } else {
      //Send friend Request
      sendFriendsRequest(user?._id)
        .then(() => {
          setToast({
            message: dict.friendRequestSent,
            icon: {uri: user?.avatar},
          });

          setHasRequest('Cancel');
        })
        .finally(() => setLoadingButton(false));
    }
  }, [user, hasFriendship, hasRequest, setToast]);

  const onPressSecondButton = React.useCallback(() => {
    if (hasRequest === 'Accept') {
      //Reject friend request
      setLoadingButton(true);
      cancelFriendsRequest(user?._id)
        .then(() => {
          setHasRequest(false);
          setHasFriendship(false);
        })
        .finally(() => setLoadingButton(false));
    }
  }, [hasRequest, user?._id]);

  React.useEffect(() => {
    Promise.all([getScores(), getFriendship(), checkFriendRequest()]).then(
      ([_, res2, res3]) => {
        if (res2) {
          setHasFriendship(true);
        }

        if (!res2 && !!res3?.toAccept) {
          setHasRequest('Accept');
        } else if (!res2 && !!res3?.toCancel) {
          setHasRequest('Cancel');
        }

        setLoading(false);
      },
    );
  }, [getScores, getFriendship, checkFriendRequest]);

  return (
    <>
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
            secondLabel={secondLabelButton}
            loadingButton={loadingButton}
            firstButtonIcon={firstButtonIcon}
            onPressFirstButton={onPressFirstButton}
            onPressSecondButton={onPressSecondButton}
          />
        </Animated.View>
      )}
    </>
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
    backgroundColor: Colors.lightGrey,
  },
  indicatorContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
