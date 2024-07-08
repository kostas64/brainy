import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Keyboard, ScrollView, StyleSheet} from 'react-native';

import {storage} from '../..';
import {Colors} from '../utils/Colors';
import {signOut} from '../services/auth';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Input from '../components/common/Input';
import Screen from '../components/common/Screen';
import {useKeyboard} from '../hooks/useKeyboard';
import Button from '../components/common/Button';
import {animateInput} from '../utils/AnimateUtils';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {useToastContext} from '../context/ToastProvider';
import {useModalContext} from '../context/ModalProvider';
import {isIOS, triggerHaptik} from '../utils/GenericUtils';
import {deleteUserAccount, updateProfile} from '../services/user';
import ConfirmationModal from '../components/common/ConfirmationModal';

const AccountScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboard(true);
  const {setToast} = useToastContext();
  const {user, setUser, setToken} = useAuthContext();
  const {closeModal, setModalInfo} = useModalContext();

  const nameTranslateX = useSharedValue(0);
  const surnameTranslateX = useSharedValue(0);
  const nicknameTranslateX = useSharedValue(0);

  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(user?.name);
  const [surname, setSurname] = React.useState(user?.surname);
  const [nickname, setNickname] = React.useState(user?.nickname);

  const nameHasChanged = name !== user?.name && name.length !== 0;

  const surnameHasChanged = surname !== user?.surname && surname.length !== 0;

  const nicknameHasChanged = nickname !== user?.nickname;

  const toUpdate = nameHasChanged || surnameHasChanged || nicknameHasChanged;

  //** ----- STYLES -----
  const bottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(8)
      : DimensionsUtils.getDP(16);

  const nameInput = useAnimatedStyle(
    () => ({transform: [{translateX: nameTranslateX.value}]}),
    [],
  );

  const surnameInput = useAnimatedStyle(
    () => ({transform: [{translateX: surnameTranslateX.value}]}),
    [],
  );

  const nicknameInput = useAnimatedStyle(
    () => ({transform: [{translateX: nicknameTranslateX.value}]}),
    [],
  );

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
        setToast({icon: images.logo, message: dict.nameUpdated});
      } else if (surnameHasChanged) {
        setToast({icon: images.logo, message: dict.surnameUpdated});
      } else if (nicknameHasChanged) {
        setToast({icon: images.logo, message: dict.nicknameUpdated});
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

  const callUpdate = React.useCallback(
    field => {
      if ((field === 'name' || nameHasChanged) && name?.length === 0) {
        triggerHaptik();
        animateInput(nameTranslateX);
        return;
      } else if (
        (field === 'surname' || surnameHasChanged) &&
        surname?.length === 0
      ) {
        triggerHaptik();
        animateInput(surnameTranslateX);
        return;
      } else if ((field === 'nickname' || nicknameHasChanged) && !nickname) {
        triggerHaptik();
        animateInput(nicknameTranslateX);
        return;
      } else {
        setLoading(true);
        updateProfile({name, surname, nickname}, successCb, errorCb);
      }
    },
    [
      name,
      nameHasChanged,
      nameTranslateX,
      surname,
      surnameHasChanged,
      surnameTranslateX,
      nickname,
      nicknameHasChanged,
      nicknameTranslateX,
      successCb,
      errorCb,
    ],
  );

  const onDonePress = React.useCallback(() => {
    if (toUpdate) {
      callUpdate();
    } else {
      navigation.pop();
    }
  }, [toUpdate, callUpdate, navigation]);

  const onDeleteAccount = React.useCallback(() => {
    deleteUserAccount(
      async () => {
        closeModal();
        navigation.pop(3);
        await signOut(setToken, setUser, true);
        setToast({icon: images.logo, message: dict.accountDeleted});
        storage.removeItem('firstTime');
      },
      () => {
        closeModal();
        setToast({icon: images.logo, message: dict.errorOnUpdate});
      },
    );
  }, [closeModal, setUser, setToken, setToast, navigation]);

  const onPressDelete = React.useCallback(() => {
    setModalInfo({
      height: 190 + bottom,
      content: (
        <ConfirmationModal
          onPressNegative={closeModal}
          onPressPositive={onDeleteAccount}
          label={dict.deleteAccountWarning}
        />
      ),
    });
  }, [bottom, closeModal, onDeleteAccount, setModalInfo]);

  return (
    <Screen label={dict.profileAccount} noIcon>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Animated.View
            style={nameInput}
            entering={FadeInUp.delay(150).duration(300)}>
            <Input
              value={name}
              onBlur={onBlur}
              setValue={setName}
              onPress={() => callUpdate('name')}
              inputLabel={dict.nameLabel}
              hasChanged={nameHasChanged}
              loading={loading && nameHasChanged}
            />
          </Animated.View>
          <View style={styles.separator} />
          <Animated.View
            style={surnameInput}
            entering={FadeInUp.delay(300).duration(300)}>
            <Input
              value={surname}
              onBlur={onBlur}
              onPress={() => callUpdate('surname')}
              setValue={setSurname}
              hasChanged={surnameHasChanged}
              inputLabel={dict.surnameLabel}
              loading={loading && surnameHasChanged}
            />
          </Animated.View>
          <View style={styles.separator} />
          <Animated.View
            style={nicknameInput}
            entering={FadeInUp.delay(450).duration(300)}>
            <Input
              value={nickname}
              onBlur={onBlur}
              onPress={() => callUpdate('nickname')}
              setValue={setNickname}
              hasChanged={nicknameHasChanged}
              inputLabel={dict.nicknameLabel}
              loading={loading && nicknameHasChanged}
            />
          </Animated.View>
          <View style={styles.separator} />
        </View>
      </ScrollView>

      {toUpdate && (
        <View style={isIOS && {transform: [{translateY: -keyboard}]}}>
          <Button
            onPress={onDonePress}
            label={dict.updateProfile}
            containerStyle={{marginBottom: bottom}}
          />
        </View>
      )}

      {keyboard === 0 && (
        <Button
          onPress={onPressDelete}
          label={dict.deleteAccount}
          labelStyle={{color: Colors.white}}
          containerStyle={{
            marginBottom: bottom,
            backgroundColor: Colors.fillRed,
          }}
        />
      )}
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
