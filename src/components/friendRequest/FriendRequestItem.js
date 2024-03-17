import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  acceptFriendsRequest,
  cancelFriendsRequest,
} from '../../services/friends';
import Button from '../common/Button';
import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import {WIDTH} from '../../utils/GenericUtils';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {calcTimestamp} from '../../utils/MathUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useToastContext} from '../../context/ToastProvider';

const FriendRequestItem = ({item, updateList}) => {
  const navigation = useNavigation();
  const {setToast} = useToastContext();

  const [loading, setLoading] = React.useState(null);

  //** ----- FUNCTIONS -----
  const onPress = React.useCallback(() => {
    navigation.navigate('Profile', {
      item: {
        user: [
          {
            _id: item.friendUserId,
            nickname: item?.nickname,
            name: item?.friendUserName,
            surname: item?.friendUserSurname,
            avatar: item?.friendUserAvatar,
          },
        ],
      },
    });
  }, [item, navigation]);

  const handleRequest = React.useCallback(
    action => {
      const acceptPressed = action === 'ACCEPT';
      const message = acceptPressed
        ? dict.acceptedRequest
        : dict.friendRequestRejected;

      setLoading(action);

      const api = acceptPressed ? acceptFriendsRequest : cancelFriendsRequest;

      api(item?.friendUserId)
        .then(() => {
          updateList(item);

          setToast({
            message,
            icon: {uri: item?.friendUserAvatar},
          });
        })
        .finally(() => setLoading(null));
    },
    [setToast, item, updateList],
  );

  return (
    <>
      <Touchable style={styles.firstRowContainer} onPress={onPress}>
        <View style={styles.row}>
          <FastImage
            style={styles.avatar}
            defaultSource={images.guest}
            source={{uri: item.friendUserAvatar}}
          />
          <View style={styles.nameContainer}>
            <Text numberOfLines={2} style={styles.name}>
              {`${item.friendUserName} ${item.friendUserSurname}`}
            </Text>
          </View>
        </View>
        <Text style={styles.timeStamp}>{calcTimestamp(item.updatedAt)}</Text>
      </Touchable>
      <View style={styles.buttonsContainer}>
        <Button
          label={dict.accept}
          disabled={!!loading}
          loading={loading === 'ACCEPT'}
          onPress={() => handleRequest('ACCEPT')}
          containerStyle={[styles.btnContainer, styles.spaceRight]}
        />
        <Button
          label={dict.reject}
          disabled={!!loading}
          loading={loading === 'REJECT'}
          labelStyle={styles.greenLabel}
          indicatorColor={Colors.appGreen}
          onPress={() => handleRequest('REJECT')}
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
    marginLeft: 74,
  },
  greenLabel: {
    color: Colors.white,
  },
  btnContainer: {
    width: (WIDTH - 120) / 2,
    minHeight: 36,
    borderRadius: DimensionsUtils.getDP(8),
  },
  whiteBG: {
    backgroundColor: Colors.tabBarBg,
  },
  spaceRight: {
    marginRight: 12,
  },
});
