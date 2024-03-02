import React from 'react';
import {StyleSheet} from 'react-native';

import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import Skeleton from '../components/skeleton/Skeleton';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {getBestOfScoresForUser} from '../services/score';
import ProfileScoresSection from '../components/profile/ProfileScoresSection';
import UserProfileModalAvatar from '../components/userProfileModal/UserProfileModalAvatar';

const ProfileScreen = ({route}) => {
  const [scores, setScores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const {item} = route?.params;

  const name = item?.user?.[0].nickname
    ? item?.user?.[0]?.nickname
    : `${item?.user?.[0]?.name} ${item?.user?.[0]?.surname}`;

  //** ----- EFFECTS -----
  React.useEffect(() => {
    getBestOfScoresForUser(item?.user?.[0]?._id)
      .then(data => setScores(data))
      .catch(e => console.log('Error ', e))
      .finally(() => setLoading(false));
  }, [item?.user]);

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
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
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
