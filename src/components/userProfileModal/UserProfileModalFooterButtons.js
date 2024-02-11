import React from 'react';
import {StyleSheet, View} from 'react-native';

import {WIDTH} from '../../utils/GenericUtils';
import ModalButton from '../common/ModalButton';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const UserProfileModalFooterButtons = ({
  isMe,
  firstLabel,
  secondLabel,
  firstButtonIcon,
  onPressFirstButton,
  onPressSecondButton,
  loadingButton = false,
}) => {
  return (
    <View style={styles.rowBetween}>
      {!isMe && (
        <ModalButton
          label={firstLabel}
          loading={loadingButton}
          icon={firstButtonIcon}
          onPress={onPressFirstButton}
          containerStyle={styles.buttonStyle}
        />
      )}
      <ModalButton
        onPress={onPressSecondButton}
        loading={loadingButton}
        containerStyle={!isMe && styles.buttonStyle}
        label={isMe ? dict.viewProfile : secondLabel}
      />
    </View>
  );
};

export default UserProfileModalFooterButtons;

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: DimensionsUtils.getDP(12),
  },
  buttonStyle: {
    width: (WIDTH - DimensionsUtils.getDP(40)) / 2,
  },
});
