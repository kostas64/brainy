import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import Chevron from './Chevron';
import Touchable from './Touchable';
import {Colors} from '../../utils/Colors';
import {WIDTH} from '../../utils/GenericUtils';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const InfoBox = ({
  onPress,
  infoLabel,
  showBox = true,
  containerStyle,
  callToActionLabel,
}) => {
  const isBtnDisabled = !onPress;

  if (!showBox) {
    return null;
  }

  return (
    <Touchable
      onPress={onPress}
      disabled={isBtnDisabled}
      style={[styles.container, containerStyle]}>
      <View style={styles.row}>
        <Image source={images.info} style={styles.infoIcn} />
        <Text style={styles.infoLabel}>{infoLabel}</Text>
      </View>

      {!isBtnDisabled && (
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaLabel}>{callToActionLabel}</Text>
          <Chevron style={styles.chevron} />
        </View>
      )}
    </Touchable>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    padding: 10,
    backgroundColor: Colors.appGreen,
    borderRadius: DimensionsUtils.getDP(8),
  },
  infoIcn: {
    marginRight: DimensionsUtils.getDP(8),
    tintColor: Colors.white,
    width: 18,
    height: 18,
  },
  infoLabel: {
    width: WIDTH - DimensionsUtils.getDP(82),
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: DimensionsUtils.getDP(12),
  },
  ctaLabel: {
    marginRight: DimensionsUtils.getDP(8),
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
  },
  chevron: {
    tintColor: Colors.white,
    height: DimensionsUtils.getDP(10),
    width: DimensionsUtils.getDP(10),
  },
});
