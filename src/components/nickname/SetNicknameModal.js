import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import Button from '../common/Button';
import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {updateProfile} from '../../services/user';
import {useKeyboard} from '../../hooks/useKeyboard';
import {animateInput} from '../../utils/AnimateUtils';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {useModalContext} from '../../context/ModalProvider';
import {useToastContext} from '../../context/ToastProvider';
import {WIDTH, triggerHaptik} from '../../utils/GenericUtils';

const SetNicknameModal = ({token, successCb}) => {
  const keyboard = useKeyboard(true);
  const insets = useSafeAreaInsets();
  const {setUser} = useAuthContext();
  const {setToast} = useToastContext();
  const {setModalInfo} = useModalContext();

  const translateX = useSharedValue(0);
  const [nickname, setNickname] = React.useState('');
  const [loadingApi, setLoadingApi] = React.useState(false);

  const bottom = insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(24);
  const modalHeight = DimensionsUtils.getDP(272) + bottom;
  const fullModalHeight = DimensionsUtils.getDP(296) + keyboard;

  //** ----- STYLES -----
  const inputStyle = useAnimatedStyle(
    () => ({transform: [{translateX: translateX.value}]}),
    [],
  );

  //** ----- FUNCTIONS -----
  const onBlur = React.useCallback(() => {
    setModalInfo(old => ({...old, height: modalHeight}));
  }, [modalHeight, setModalInfo]);

  const onPressSet = React.useCallback(() => {
    if (nickname.length === 0) {
      triggerHaptik();
      animateInput(translateX);
      return;
    } else {
      setLoadingApi(true);
      updateProfile({nickname}, null, null, token).finally(async () => {
        setLoadingApi(false);
        successCb();
        setUser(old => ({...old, nickname}));
        setToast({icon: images.logo, message: dict.nicknameUpdated});
      });
    }
  }, [token, nickname, successCb, setToast, setUser, translateX]);

  //** ----- EFFECTS
  React.useEffect(() => {
    if (keyboard > 0) {
      setModalInfo(old => ({...old, height: fullModalHeight}));
    }
  }, [keyboard, fullModalHeight, setModalInfo]);

  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
      <Text style={[styles.title, styles.spaceHor]}>
        {dict.chooseNicknameLabel}
      </Text>

      <Animated.View style={inputStyle}>
        <TextInput
          autoFocus
          onBlur={onBlur}
          onChangeText={setNickname}
          style={[styles.input, styles.spaceHor]}
        />
      </Animated.View>

      <Text style={[styles.tip, styles.spaceHor]}>
        {dict.chooseNickanemTip}
      </Text>

      <View style={[styles.rowBetween, styles.spaceHor]}>
        <Button
          onPress={onPressSet}
          loading={loadingApi}
          disabled={loadingApi}
          label={dict.setNicknameLabel}
          containerStyle={styles.setBtn}
        />
        <Button
          onPress={successCb}
          disabled={loadingApi}
          label={dict.skipLabel}
          labelStyle={styles.labelStyle}
          containerStyle={styles.skipBtn}
        />
      </View>
    </ScrollView>
  );
};

export default SetNicknameModal;

const styles = StyleSheet.create({
  spaceHor: {
    marginHorizontal: DimensionsUtils.getDP(20),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(20),
  },
  input: {
    borderWidth: 2,
    color: Colors.white,
    borderColor: Colors.appGreen,
    marginTop: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(12),
    fontSize: DimensionsUtils.getFontSize(18),
    paddingVertical: DimensionsUtils.getDP(12),
    paddingHorizontal: DimensionsUtils.getDP(12),
  },
  tip: {
    color: Colors.tabBarIcon,
    marginTop: DimensionsUtils.getDP(4),
    paddingLeft: DimensionsUtils.getDP(4),
    marginBottom: DimensionsUtils.getDP(64),
    fontSize: DimensionsUtils.getFontSize(12),
  },
  skipBtn: {
    backgroundColor: Colors.lightGrey,
    width: (WIDTH - DimensionsUtils.getDP(56)) / 2,
  },
  setBtn: {
    width: (WIDTH - DimensionsUtils.getDP(56)) / 2,
  },
  labelStyle: {
    color: Colors.white,
  },
});
