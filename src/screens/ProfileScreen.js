import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  areWeFriends,
  deleteFriend,
  getFriendsRequest,
  sendFriendsRequest,
  acceptFriendsRequest,
  cancelFriendsRequest,
} from '../services/friends';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import Skeleton from '../components/skeleton/Skeleton';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getBestOfScoresForUser} from '../services/score';
import {useToastContext} from '../context/ToastProvider';
import ProfileFriendButtons from '../components/profile/ProfileFriendButtons';
import ProfileScoresSection from '../components/profile/ProfileScoresSection';
import UserProfileModalAvatar from '../components/userProfileModal/UserProfileModalAvatar';

const ProfileScreen = ({route}) => {
  const insets = useSafeAreaInsets();
  const {setToast} = useToastContext();

  const [scores, setScores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const [hasRequest, setHasRequest] = React.useState(false);
  const [hasFriendship, setHasFriendship] = React.useState(false);

  const {item} = route?.params;

  const bottom = insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(20);

  const name = item?.user?.[0].nickname
    ? item?.user?.[0]?.nickname
    : `${item?.user?.[0]?.name} ${item?.user?.[0]?.surname}`;

  const firstButtonLabel =
    !hasRequest && !hasFriendship
      ? dict.addFriend
      : hasRequest === 'Accept'
      ? dict.acceptRequest
      : hasRequest === 'Cancel'
      ? dict.cancelRequest
      : dict.removeFriend;

  const secondButtonLabel = dict.rejectRequest;

  const showSecondButton = hasRequest === 'Accept';

  //** -----FUNCTIONS -----
  const getScores = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      getBestOfScoresForUser(item?.user?.[0]?._id)
        .then(data => {
          setScores(data);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }, [item?.user]);

  const getFriendship = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      areWeFriends(item?.user?.[0]?._id)
        .then(data => resolve(data))
        .catch(reject);
    });
  }, [item?.user]);

  const checkFriendRequest = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      getFriendsRequest(item?.user?.[0]?._id)
        .then(data => resolve(data))
        .catch(reject);
    });
  }, [item?.user]);

  const onPressFirstButton = React.useCallback(() => {
    setLoadingBtn('FIRST');

    if (hasFriendship) {
      //Delete friend
      deleteFriend(item?.user?.[0]?._id)
        .then(() => {
          setToast({
            message: dict.deleteFriend,
            icon: {uri: item?.user?.[0]?.avatar},
          });

          setHasRequest(false);
          setHasFriendship(false);
        })
        .finally(() => setLoadingBtn(false));
    } else if (hasRequest === 'Accept') {
      //Accept Request
      acceptFriendsRequest(item?.user?.[0]?._id)
        .then(() => {
          setToast({
            message: dict.acceptedRequest,
            icon: {uri: item?.user?.[0]?.avatar},
          });

          setHasRequest(false);
          setHasFriendship(true);
        })
        .finally(() => setLoadingBtn(false));
    } else if (hasRequest === 'Cancel') {
      //Cancel Request
      cancelFriendsRequest(item?.user?.[0]?._id)
        .then(() => {
          setHasRequest(false);
        })
        .finally(() => setLoadingBtn(false));
    } else {
      //Send friend Request
      sendFriendsRequest(item?.user?.[0]?._id)
        .then(() => {
          setToast({
            message: dict.friendRequestSent,
            icon: {uri: item?.user?.[0]?.avatar},
          });

          setHasRequest('Cancel');
        })
        .finally(() => setLoadingBtn(false));
    }
  }, [item?.user, hasFriendship, hasRequest, setToast]);

  const onPressSecondButton = React.useCallback(() => {
    //Reject friend request
    setLoadingBtn('SECOND');

    cancelFriendsRequest(item?.user?.[0]?._id)
      .then(() => {
        setHasRequest(false);
        setHasFriendship(false);
      })
      .finally(() => setLoadingBtn(false));
  }, [item?.user]);

  //** ----- EFFECTS -----
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

        setTimeout(() => {
          setLoading(false);
        }, 500);
      },
    );
  }, [getScores, getFriendship, checkFriendRequest]);

  return (
    <Screen label={dict.profileScrTitle} noIcon>
      <Skeleton
        type={'profile'}
        loading={loading}
        skeletonStyle={styles.skeletonStyle}>
        <UserProfileModalAvatar
          name={name}
          contStyle={styles.avatarCont}
          imgStyle={styles.imgStyle}
          imgContStyle={styles.imgCont}
          user={{avatar: item?.user?.[0]?.avatar}}
        />
        <ProfileScoresSection passedScores={scores} />
      </Skeleton>

      <View style={[styles.absolute, {bottom}]}>
        <ProfileFriendButtons
          loading={loading}
          loadingBtn={loadingBtn}
          hasFriendship={hasFriendship}
          showSecondButton={showSecondButton}
          firstButtonLabel={firstButtonLabel}
          secondButtonLabel={secondButtonLabel}
          onPressFirstButton={onPressFirstButton}
          onPressSecondButton={onPressSecondButton}
        />
      </View>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  skeletonStyle: {
    marginLeft: DimensionsUtils.getDP(16),
    marginTop: DimensionsUtils.getDP(16),
  },
  avatarCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(112),
    height: DimensionsUtils.getDP(112),
    borderRadius: DimensionsUtils.getDP(56),
  },
  imgCont: {
    width: DimensionsUtils.getDP(106),
    height: DimensionsUtils.getDP(106),
    borderRadius: DimensionsUtils.getDP(53),
  },
  imgStyle: {
    width: DimensionsUtils.getDP(102),
    height: DimensionsUtils.getDP(102),
    borderRadius: DimensionsUtils.getDP(51),
  },
});
