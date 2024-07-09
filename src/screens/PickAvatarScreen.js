import {
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {WIDTH} from '../utils/GenericUtils';
import dict from '../assets/values/dict.json';
import {updateProfile} from '../services/user';
import Screen from '../components/common/Screen';
import {AVATARS} from '../assets/values/avatars';
import Button from '../components/common/Button';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';

const PickAvatarScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {user, setUser} = useAuthContext();

  const bottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(8)
      : DimensionsUtils.getDP(16);

  const [selected, setSelected] = React.useState(user?.avatar || 0);
  const [loading, setLoading] = React.useState(false);

  const renderItem = React.useCallback(
    ({item, index}) => {
      const isLast = index === AVATARS.length - 1;
      const isSelected = selected === index;

      return (
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setSelected(index)}
          style={[
            styles.itemContainer,
            {
              marginBottom:
                WIDTH / 3 -
                DimensionsUtils.getDP(96) +
                (isLast ? DimensionsUtils.getDP(16) : 0),
            },
          ]}>
          <Image
            source={item}
            key={`avatar-${index}`}
            style={[styles.img, isSelected && styles.selected]}
          />
        </TouchableOpacity>
      );
    },
    [selected],
  );

  const onPress = () => {
    setLoading(true);

    updateProfile({nickname: route?.params?.nickname, avatar: selected}, () => {
      setLoading(false);

      let payloadToUpdate = {
        avatar: selected,
      };

      if (route?.params?.nickname) {
        payloadToUpdate = {
          ...payloadToUpdate,
          nickname: route?.params?.nickname,
        };
      }

      setUser(old => ({
        ...old,
        ...payloadToUpdate,
      }));

      if (route?.params?.onUpdate) {
        route?.params?.onUpdate();
        return;
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {name: 'GetStarted'},
            {
              name: 'GamesStack',
              params: {
                screen: 'Games',
                params: {
                  backTransition: route?.params?.backTransition,
                },
              },
            },
          ],
        }),
      );
    });
  };

  return (
    <Screen label={dict.pickAvatar} noIcon>
      <FlatList
        data={AVATARS}
        numColumns={3}
        renderItem={renderItem}
        style={styles.spaceTop}
        showsVerticalScrollIndicator={false}
      />
      <View style={{bottom}}>
        <Button
          loading={loading}
          label={dict.getStartedLoggedInButton}
          onPress={onPress}
        />
      </View>
    </Screen>
  );
};

export default PickAvatarScreen;

const styles = StyleSheet.create({
  img: {
    width: DimensionsUtils.getDP(96),
    height: DimensionsUtils.getDP(96),
  },
  itemContainer: {
    width: WIDTH / 3,
    alignItems: 'center',
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(16),
  },
  selected: {
    borderWidth: 3,
    borderRadius: 100,
    borderColor: Colors.appGreen,
  },
});
