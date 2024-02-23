import Animated, {
  FadeInUp,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Keyboard, ScrollView, StyleSheet} from 'react-native';

import {isIOS} from '../utils/GenericUtils';
import dict from '../assets/values/dict.json';
import Input from '../components/common/Input';
import {updateProfile} from '../services/user';
import Screen from '../components/common/Screen';
import {useKeyboard} from '../hooks/useKeyboard';
import Button from '../components/common/Button';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {useToastContext} from '../context/ToastProvider';

const AccountScreen = ({navigation}) => {
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();
  const {setToast} = useToastContext();
  const {user, setUser} = useAuthContext();

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(user?.name);
  const [surname, setSurname] = React.useState(user?.surname);
  const [nickname, setNickname] = React.useState(user?.nickname);

  const nameHasChanged = name !== user?.name;
  const surnameHasChanged = surname !== user?.surname;
  const nicknameHasChanged = nickname !== user?.nickname;

  const toUpdate = nameHasChanged || surnameHasChanged || nicknameHasChanged;
  const buttonLabel = toUpdate ? dict.updateProfile : dict?.doneLabel;

  //** ----- STYLES -----
  const bottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(8)
      : DimensionsUtils.getDP(16);

  const animatedBtnStyle = useAnimatedStyle(() => ({
    transform: [{translateY: withSpring(-keyboard, {damping: 17})}],
  }));

  //** ----- FUNCTIONS -----
  const onBlur = React.useCallback(() => {
    if (nameHasChanged) {
      setName(user?.name);
    } else if (surnameHasChanged) {
      setSurname(user?.surname);
    } else if (nicknameHasChanged) {
      setNickname(user?.nickname);
    }
  }, [user, nameHasChanged, surnameHasChanged, nicknameHasChanged]);

  const successCb = React.useCallback(
    async data => {
      Keyboard.dismiss();
      setLoading(false);

      setName(data?.name);
      setSurname(data?.surname);
      setNickname(data?.nickname);

      setUser(old => ({
        ...old,
        name: data?.name,
        surname: data?.surname,
        nickname: data.nickname,
      }));

      if (nameHasChanged) {
        setToast({message: dict.nameUpdated});
      } else if (surnameHasChanged) {
        setToast({message: dict.surnameUpdated});
      } else if (nicknameHasChanged) {
        setToast({message: dict.nicknameUpdated});
      }
    },
    [setUser, setToast, nameHasChanged, surnameHasChanged, nicknameHasChanged],
  );

  const errorCb = React.useCallback(() => {
    Keyboard.dismiss();
    setLoading(false);

    setName(user?.name);
    setSurname(user?.surname);
    setNickname(user?.nickname);
  }, [user]);

  const callUpdate = React.useCallback(() => {
    setLoading(true);
    updateProfile({name, surname, nickname}, successCb, errorCb);
  }, [name, surname, nickname, successCb, errorCb]);

  const onDonePress = React.useCallback(() => {
    if (toUpdate) {
      callUpdate();
    } else {
      navigation.pop();
    }
  }, [toUpdate, callUpdate, navigation]);

  return (
    <Screen label={dict.profileAccount} navigation={navigation} noIcon>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Animated.View entering={FadeInUp.delay(150).duration(300)}>
            <Input
              value={name}
              onBlur={onBlur}
              setValue={setName}
              onPress={callUpdate}
              inputLabel={dict.nameLabel}
              hasChanged={nameHasChanged}
              loading={loading && nameHasChanged}
            />
          </Animated.View>
          <View style={styles.separator} />
          <Animated.View entering={FadeInUp.delay(300).duration(300)}>
            <Input
              value={surname}
              onBlur={onBlur}
              onPress={callUpdate}
              setValue={setSurname}
              hasChanged={surnameHasChanged}
              inputLabel={dict.surnameLabel}
              loading={loading && surnameHasChanged}
            />
          </Animated.View>
          <View style={styles.separator} />
          <Animated.View entering={FadeInUp.delay(450).duration(300)}>
            <Input
              value={nickname}
              onBlur={onBlur}
              onPress={callUpdate}
              setValue={setNickname}
              hasChanged={nicknameHasChanged}
              inputLabel={dict.nicknameLabel}
              loading={loading && nicknameHasChanged}
            />
          </Animated.View>
        </View>
      </ScrollView>

      <Animated.View style={isIOS && animatedBtnStyle}>
        <Button
          label={buttonLabel}
          onPress={onDonePress}
          containerStyle={{marginBottom: bottom}}
        />
      </Animated.View>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: DimensionsUtils.getDP(20),
    marginTop: DimensionsUtils.getDP(24),
  },
  separator: {
    marginVertical: DimensionsUtils.getDP(12),
  },
});
