import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  areWeFriends,
  deleteFriend,
  getFriendsRequest,
  sendFriendsRequest,
  acceptFriendsRequest,
  cancelFriendsRequest,
} from '../services/friends';
import {Colors} from '../utils/Colors';
import useTimeout from '../hooks/useTimeout';
import dict from '../assets/values/dict.json';
import {isAndroid} from '../utils/GenericUtils';
import Screen from '../components/common/Screen';
import {LIST_GAMES} from '../assets/values/games';
import Skeleton from '../components/skeleton/Skeleton';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getBestOfScoresForUser} from '../services/score';
import {useToastContext} from '../context/ToastProvider';
import ProfileFriendButtons from '../components/profile/ProfileFriendButtons';
import ProfileScoresSection from '../components/profile/ProfileScoresSection';
import UserProfileModalAvatar from '../components/userProfileModal/UserProfileModalAvatar';

const ProfileScreen = ({route}) => {
  const timeout = useTimeout();
  const insets = useSafeAreaInsets();
  const {setToast} = useToastContext();

  const scrollRef = React.useRef();
  const itemRefs = React.useRef([]);
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
  const showScoreSection = itemRefs.current?.length === LIST_GAMES.length;

  //** -----FUNCTIONS -----
  const onMomentumScrollEnd = React.useCallback(() => {
    itemRefs.current?.map((_, index) => {
      itemRefs.current?.[index]?.current?.measureAndAnimate();
    });
  }, []);

  const onScroll = React.useCallback(({nativeEvent}) => {
    if (isAndroid) {
      const contentOffset = Math.round(nativeEvent.contentOffset.y);
      const layoutMeasurement = Math.round(
        nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height,
      );

      itemRefs.current?.forEach((_, index) => {
        if (itemRefs.current?.[index]?.current?.getIsScrolling) {
          if (contentOffset === layoutMeasurement || contentOffset === 130) {
            //1st condition scroll end - 2nd condition scroll top
            itemRefs.current?.[index]?.current?.measureAndAnimate();
          }
        }
      });
    }
  }, []);

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
    LIST_GAMES.map(() => itemRefs.current.push(React.createRef()));
  }, []);

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

        timeout.current = setTimeout(() => {
          setLoading(false);
        }, 500);
      },
    );
  }, [timeout, getScores, getFriendship, checkFriendRequest]);

  return (
    <Screen
      noIcon
      label={dict.profileScrTitle}
      headerStyle={styles.headerStyle}>
      <ScrollView
        ref={scrollRef}
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={32}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={{marginBottom: bottom + DimensionsUtils.getDP(50)}}>
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
          <ProfileScoresSection
            itemRefs={itemRefs}
            scrollRef={scrollRef}
            passedScores={scores}
            show={showScoreSection}
          />
        </Skeleton>
      </ScrollView>

      <View style={[styles.absolute, {bottom}]}>
        <ProfileFriendButtons
          loading={loading}
          loadingBtn={loadingBtn}
          hasFriendship={hasFriendship}
          showSecondButton={showSecondButton}
          firstButtonLabel={firstButtonLabel}
          secondButtonLabel={secondButtonLabel}
          secondBtnContainer={styles.scndBtnCont}
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
  headerStyle: {
    marginBottom: DimensionsUtils.getDP(4),
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
  scndBtnCont: {
    backgroundColor: Colors.tabBarBg,
  },
});
