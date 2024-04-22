import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {Colors} from '../utils/Colors';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import {getMyProfile} from '../services/user';
import Screen from '../components/common/Screen';
import {LIST_GAMES} from '../assets/values/games';
import {isAndroid, isIOS} from '../utils/GenericUtils';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getAllFriendsRequest} from '../services/friends';
import ProfileScoresSection from '../components/profile/ProfileScoresSection';
import UserProfileModalAvatar from '../components/userProfileModal/UserProfileModalAvatar';

const MyProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user, setUser} = useAuthContext();

  const scrollRef = React.useRef();
  const itemRefs = React.useRef([]);
  const [friendRequests, setFriendRequests] = React.useState([]);

  const name = user?.isGuest
    ? dict.guest
    : user?.nickname
    ? user?.nickname
    : `${user?.name ? user?.name : ''} ${user?.surname ? user?.surname : ''}`;

  const shouldCall = isFocused && !user?.isGuest;
  const icon = user?.isGuest ? images.guest : null;
  const nameStyle = user?.isGuest && styles.whiteColor;
  const contStyle = user?.isGuest ? styles.guestAvatarCont : styles.avatarCont;
  const showScoreSection = itemRefs.current?.length === LIST_GAMES.length;

  //** ----- FUNCTIONS -----
  const onIconPress = React.useCallback(
    screen => navigation.navigate(screen),
    [navigation],
  );

  const onMomentumScrollEnd = React.useCallback(() => {
    if (isIOS) {
      itemRefs.current?.map((_, index) => {
        itemRefs.current?.[index]?.current?.measureAndAnimate();
      });
    }
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

  //** ----- EFFECTS -----
  React.useEffect(() => {
    LIST_GAMES.map(() => itemRefs.current.push(React.createRef()));
  }, []);

  React.useEffect(() => {
    shouldCall && getMyProfile(setUser);
    shouldCall && getAllFriendsRequest().then(data => setFriendRequests(data));
  }, [shouldCall, setUser]);

  return (
    <Screen
      secondIcon
      noIcon={user?.isGuest}
      customIcon={images.gear}
      iconStyle={styles.gearIcon}
      label={dict.profileScrTitle}
      headerStyle={styles.headerStyle}
      onIconPress={() => onIconPress('Settings')}
      onScndIcnPress={() => onIconPress('FriendsTabs')}
      hasDot={friendRequests?.length > 0}>
      <ScrollView
        ref={scrollRef}
        bounces={false}
        onScroll={onScroll}
        scrollEventThrottle={32}
        onMomentumScrollEnd={onMomentumScrollEnd}>
        <UserProfileModalAvatar
          user={user}
          name={name}
          icon={icon}
          nameStyle={nameStyle}
          contStyle={contStyle}
          imgStyle={styles.imgStyle}
          imgContStyle={styles.imgCont}
        />
        <ProfileScoresSection
          itemRefs={itemRefs}
          scrollRef={scrollRef}
          show={showScoreSection}
        />
      </ScrollView>
    </Screen>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  headerStyle: {
    marginBottom: DimensionsUtils.getDP(8),
  },
  avatarCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(112),
    height: DimensionsUtils.getDP(112),
    borderRadius: DimensionsUtils.getDP(56),
  },
  guestAvatarCont: {
    marginTop: DimensionsUtils.getDP(8),
    borderColor: Colors.white,
    width: DimensionsUtils.getDP(112),
    height: DimensionsUtils.getDP(112),
    borderRadius: DimensionsUtils.getDP(56),
  },
  gearIcon: {
    tintColor: Colors.appGreen,
    width: 21,
    height: 21,
    borderWidth: 0,
    borderRadius: 0,
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
  whiteColor: {
    color: Colors.white,
    marginBottom: DimensionsUtils.getDP(8),
  },
});
