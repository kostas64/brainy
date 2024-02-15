import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';

import {
  acceptFriendsRequest,
  cancelFriendsRequest,
} from '../../services/friends';
import Button from '../common/Button';
import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import dict from '../../assets/values/dict.json';
import {calcTimestamp} from '../../utils/MathUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useToastContext} from '../../context/ToastProvider';

const FriendRequestItem = ({item, updateList}) => {
  const {setToast} = useToastContext();

  const [loading, setLoading] = React.useState(false);

  //** ----- FUNCTIONS -----
  const handleRequest = React.useCallback(
    action => {
      const acceptPressed = action === 'ACCEPT';
      const message = acceptPressed
        ? dict.acceptedRequest
        : dict.friendRequestRejected;

      setLoading(true);

      const api = acceptPressed ? acceptFriendsRequest : cancelFriendsRequest;

      api(item?.friendUserId)
        .then(() => {
          updateList(item);

          setToast({
            message,
            icon: {uri: item?.friendUserAvatar},
          });
        })
        .finally(() => setLoading(false));
    },
    [setToast, item, updateList],
  );

  return (
    <>
      <View style={styles.firstRowContainer}>
        <View style={styles.row}>
          <FastImage
            style={styles.avatar}
            source={{uri: item.friendUserAvatar}}
          />
          <View style={styles.nameContainer}>
            <Text numberOfLines={2} style={styles.name}>
              {`${item.friendUserName} ${item.friendUserSurname}`}
            </Text>
          </View>
        </View>
        <Text style={styles.timeStamp}>{calcTimestamp(item.updatedAt)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          loading={loading}
          disabled={loading}
          label={dict.accept}
          onPress={() => handleRequest('ACCEPT')}
          labelStyle={styles.buttonLabel}
          containerStyle={[styles.btnContainer, styles.spaceRight]}
        />
        <Button
          loading={loading}
          disabled={loading}
          label={dict.reject}
          indicatorColor={Colors.appGreen}
          onPress={() => handleRequest('REJECT')}
          labelStyle={[styles.buttonLabel, styles.greenLabel]}
          containerStyle={[styles.btnContainer, styles.whiteBG]}
        />
      </View>
    </>
  );
};

export default FriendRequestItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  firstRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameContainer: {
    marginLeft: DimensionsUtils.getDP(16),
    width: WIDTH - DimensionsUtils.getDP(154),
  },
  name: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(18),
  },
  timeStamp: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    marginTop: DimensionsUtils.getDP(3),
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: DimensionsUtils.getDP(4),
    marginLeft: DimensionsUtils.getDP(76),
  },
  buttonLabel: {
    fontFamily: 'Poppins-Medium',
  },
  greenLabel: {
    color: Colors.appGreen,
  },
  btnContainer: {
    width: (WIDTH - DimensionsUtils.getDP(132)) / 2,
    minHeight: 36,
    borderRadius: DimensionsUtils.getDP(8),
  },
  whiteBG: {
    backgroundColor: Colors.white,
  },
  spaceRight: {
    marginRight: DimensionsUtils.getDP(8),
  },
});
