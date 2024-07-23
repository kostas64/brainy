import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, StatusBar, StyleSheet, View} from 'react-native';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import Input from '../components/common/Input';
import {updateProfile} from '../services/user';
import {isAndroid} from '../utils/GenericUtils';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import useBackAction from '../hooks/useBackAction';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';

const SetNicknameScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {user, setUser} = useAuthContext();

  const bottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(8)
      : DimensionsUtils.getDP(16);

  const [loading, setLoading] = React.useState(false);
  const [nickname, setNickname] = React.useState(user?.nickname);

  useBackAction(() => {
    return true;
  });

  const onPress = () => {
    setLoading(true);

    updateProfile({nickname}, () => {
      setUser(old => ({
        ...old,
        nickname,
      }));

      setLoading(false);

      navigation.navigate('PickAvatar', {
        nickname,
        backTransition: route?.params?.backTransition,
      });
    });
  };

  React.useEffect(() => {
    if (user?.nickname) {
      setNickname(user?.nickname);
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={isAndroid ? null : 'padding'}>
      <Screen label={dict.setNicknameLabel} noIcon>
        <View style={styles.space}>
          <Input
            inputLabel={dict.nicknameLabel}
            value={nickname}
            setValue={setNickname}
          />
        </View>

        <View style={[styles.absoluteCenter, {bottom}]}>
          <Button
            onPress={onPress}
            loading={loading}
            label={dict.getStartedLoggedInButton}
            disabled={nickname?.length === 0 || loading}
          />
        </View>
      </Screen>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.background}
      />
    </KeyboardAvoidingView>
  );
};

export default SetNicknameScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  space: {
    marginTop: DimensionsUtils.getDP(24),
    marginHorizontal: DimensionsUtils.getDP(20),
  },
  absoluteCenter: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
