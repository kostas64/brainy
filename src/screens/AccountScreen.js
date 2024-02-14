import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Keyboard, ScrollView, StyleSheet} from 'react-native';

import dict from '../assets/values/dict.json';
import Input from '../components/common/Input';
import {updateProfile} from '../services/user';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import {useAuthContext} from '../context/AuthProvider';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {useToastContext} from '../context/ToastProvider';

const AccountScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const {setToast} = useToastContext();
  const {user, setUser} = useAuthContext();

  const [name, setName] = React.useState(user?.name);
  const [surname, setSurname] = React.useState(user?.surname);
  const [loading, setLoading] = React.useState(false);

  const nameHasChanged = name !== user?.name;
  const surnameHasChanged = surname !== user?.surname;

  //** ----- STYLES -----
  const bottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(8)
      : DimensionsUtils.getDP(16);

  //** ----- FUNCTIONS -----
  const onBlur = React.useCallback(() => {
    if (nameHasChanged) {
      setName(user?.name);
    } else if (surnameHasChanged) {
      setSurname(user?.surname);
    }
  }, [user?.name, user?.surname, nameHasChanged, surnameHasChanged]);

  const successCb = React.useCallback(
    async data => {
      Keyboard.dismiss();
      setLoading(false);
      setName(data?.name);
      setSurname(data?.surname);
      setUser(old => ({
        ...old,
        name: data?.name,
        surname: data?.surname,
      }));

      if (nameHasChanged) {
        setToast({message: dict.nameUpdated});
      } else if (surnameHasChanged) {
        setToast({message: dict.surnameUpdated});
      }
    },
    [setUser, setToast, nameHasChanged, surnameHasChanged],
  );

  const errorCb = React.useCallback(() => {
    Keyboard.dismiss();
    setLoading(false);
    setName(user?.name);
    setSurname(user?.surname);
  }, [user?.name, user?.surname]);

  const callUpdate = React.useCallback(() => {
    setLoading(true);
    updateProfile({name, surname}, successCb, errorCb);
  }, [name, surname, successCb, errorCb]);

  return (
    <Screen label={dict.profileAccount} navigation={navigation} noIcon>
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Input
            value={name}
            onBlur={onBlur}
            setValue={setName}
            onPress={callUpdate}
            inputLabel={dict.nameLabel}
            hasChanged={nameHasChanged}
            loading={loading && nameHasChanged}
          />
          <View style={styles.separator} />
          <Input
            value={surname}
            onBlur={onBlur}
            onPress={callUpdate}
            setValue={setSurname}
            inputLabel={dict.surnameLabel}
            hasChanged={surnameHasChanged}
            loading={loading && surnameHasChanged}
          />
        </View>
      </ScrollView>

      <Button
        label={dict?.doneLabel}
        onPress={() => navigation.pop()}
        containerStyle={{marginBottom: bottom}}
      />
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
    marginVertical: DimensionsUtils.getDP(16),
  },
});
