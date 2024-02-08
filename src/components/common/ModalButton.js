import {
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ModalButton = ({
  icon,
  label,
  textStyle,
  containerStyle,
  loading = false,
  onPress = () => {},
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.container, containerStyle]}>
      {!loading ? (
        <>
          {!!icon && <Image source={icon} style={styles.icon} />}
          <Text style={[styles.label, textStyle]}>{label}</Text>
        </>
      ) : (
        <ActivityIndicator size={'small'} color={Colors.white} />
      )}
    </Pressable>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  container: {
    height: 46,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: DimensionsUtils.getDP(8),
    width: WIDTH - DimensionsUtils.getDP(32),
    paddingVertical: DimensionsUtils.getDP(12),
    backgroundColor: Colors.appGreen,
  },
  label: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(14),
  },
  icon: {
    tintColor: Colors.white,
    left: -DimensionsUtils.getDP(8),
    width: DimensionsUtils.getDP(20),
    height: DimensionsUtils.getDP(20),
  },
});
