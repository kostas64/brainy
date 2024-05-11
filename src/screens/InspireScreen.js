import {
  View,
  Text,
  Keyboard,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {shareIdea} from '../services/idea';
import {isIOS} from '../utils/GenericUtils';
import images from '../assets/images/images';
import dict from '../assets/values/dict.json';
import Screen from '../components/common/Screen';
import Button from '../components/common/Button';
import {useKeyboard} from '../hooks/useKeyboard';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {useToastContext} from '../context/ToastProvider';

const InspireScreen = ({navigation}) => {
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();
  const {setToast} = useToastContext();

  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const showButton = input.length > 0;

  //** ----- STYLES -----
  const bottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(8)
      : DimensionsUtils.getDP(16);

  //** ----- FUNCTIONS -----
  const onPressShare = React.useCallback(() => {
    setLoading(true);

    shareIdea(input)
      .then(() => {
        setInput('');
        Keyboard.dismiss();
        setToast({icon: images.logo, message: dict.shareToast});
      })
      .catch(() => setToast({message: dict.errorOnUpdate}))
      .finally(() => setLoading(false));
  }, [input, setToast]);

  return (
    <Screen label={dict.inspireScrTitle} noIcon>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <Text style={styles.label}>{dict.inspireDescription}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            autoFocus
            multiline
            value={input}
            style={styles.input}
            onChangeText={setInput}
            placeholder="Write your idea..."
            placeholderTextColor={Colors.halfWhite}
          />
        </View>
      </ScrollView>

      {showButton && (
        <View style={isIOS && {transform: [{translateY: -keyboard}]}}>
          <Button
            loading={loading}
            disabled={loading}
            onPress={onPressShare}
            label={dict.shareLabel}
            containerStyle={{marginBottom: bottom}}
          />
        </View>
      )}
    </Screen>
  );
};

export default InspireScreen;

const styles = StyleSheet.create({
  label: {
    textAlign: 'justify',
    color: Colors.appGreen,
    fontFamily: 'Poppins-Regular',
    marginTop: DimensionsUtils.getDP(8),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  inputContainer: {
    height: isIOS ? 128 : 120,
    borderWidth: 2,
    borderColor: Colors.appGreen,
    marginTop: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(8),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  input: {
    color: Colors.white,
    textAlignVertical: 'top',
    marginTop: isIOS ? 8 : 4,
    marginHorizontal: 12,
    height: isIOS ? 104 : 112,
    fontFamily: 'Poppins-Regular',
  },
});
