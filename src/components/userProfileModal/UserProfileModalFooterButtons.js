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
        label={isMe ? dict.viewProfile : secondLabel}
        containerStyle={!isMe ? styles.buttonStyle : styles.soloButtonStyle}
      />
    </View>
  );
};

export default UserProfileModalFooterButtons;

const styles = StyleSheet.create({
  rowBetween: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: DimensionsUtils.getDP(18),
  },
  soloButtonStyle: {
    width: WIDTH - DimensionsUtils.getDP(36),
  },
  buttonStyle: {
    width: (WIDTH - DimensionsUtils.getDP(52)) / 2,
  },
});
