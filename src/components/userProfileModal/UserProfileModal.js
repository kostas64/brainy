import React from 'react';
import {StyleSheet} from 'react-native';

import Button from '../common/Button';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import UserProfileModalAvatar from './UserProfileModalAvatar';

const UserProfileModal = ({isMe, item, onViewProfilePress}) => {
  const user = item?.user?.[0];
  const name = user?.nickname
    ? user?.nickname
    : `${user?.name} ${user?.surname}`;

  const buttonLabel = isMe ? dict.goToProfile : dict.viewProfile;

  return (
    <>
      <UserProfileModalAvatar name={name} user={user} />

      <Button
        label={buttonLabel}
        onPress={onViewProfilePress}
        containerStyle={styles.spaceTop}
      />
    </>
  );
};

const styles = StyleSheet.create({
  spaceTop: {
    marginTop: DimensionsUtils.getDP(24),
  },
});

export default UserProfileModal;
