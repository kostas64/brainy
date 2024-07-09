import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

import dict from '../assets/values/dict.json';
import Input from '../components/common/Input';
import {isAndroid} from '../utils/GenericUtils';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import {DimensionsUtils} from '../utils/DimensionUtils';

const SetNicknameScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const bottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(8)
      : DimensionsUtils.getDP(16);

  const [nickname, setNickname] = React.useState('');

  const onPress = () => {
    navigation.navigate('PickAvatar', {
      nickname,
      backTransition: route?.params?.backTransition,
    });
  };

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
            disabled={nickname.length === 0}
            label={dict.getStartedLoggedInButton}
          />
        </View>
      </Screen>
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
