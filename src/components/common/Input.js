import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Input = ({
  value,
  onBlur,
  onPress,
  loading,
  setValue,
  hasChanged,
  inputLabel,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>{inputLabel}</Text>

      <TextInput
        value={value}
        onBlur={onBlur}
        returnKeyType="done"
        blurOnSubmit={false}
        onChangeText={setValue}
        style={styles.textInput}
        placeholder={placeholder}
        onSubmitEditing={onPress}
        selectionColor={Colors.appGreen}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'small'} color={Colors.appGreen} />
        </View>
      )}
      {hasChanged && !loading && (
        <Pressable onPress={onPress} hitSlop={styles.hitSlop}>
          <Image source={images.check} style={styles.check} />
        </Pressable>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.appGreen,
    borderWidth: DimensionsUtils.getDP(2),
    borderRadius: DimensionsUtils.getDP(12),
  },
  inputLabel: {
    minWidth: DimensionsUtils.getDP(68),
    top: -DimensionsUtils.getDP(14),
    left: DimensionsUtils.getDP(16),
    paddingHorizontal: DimensionsUtils.getDP(8),
    textAlign: 'center',
    backgroundColor: Colors.background,
    position: 'absolute',
    color: Colors.appGreen,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(16),
  },
  textInput: {
    color: Colors.white,
    paddingLeft: DimensionsUtils.getDP(16),
    paddingTop: DimensionsUtils.getDP(16),
    paddingBottom: DimensionsUtils.getDP(12),
    paddingRight: DimensionsUtils.getDP(56),
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(18),
  },
  loader: {
    position: 'absolute',
    top: 18,
    right: DimensionsUtils.getDP(16),
  },
  check: {
    position: 'absolute',
    top: -DimensionsUtils.getDP(40),
    right: DimensionsUtils.getDP(16),
    width: DimensionsUtils.getDP(26),
    height: DimensionsUtils.getDP(26),
  },
  hitSlop: {
    top: DimensionsUtils.getDP(16),
    bottom: DimensionsUtils.getDP(16),
    left: DimensionsUtils.getDP(16),
    right: DimensionsUtils.getDP(16),
  },
});
