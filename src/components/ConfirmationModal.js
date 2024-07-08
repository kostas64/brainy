import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from './common/Button';
import {Colors} from '../utils/Colors';
import {WIDTH} from '../utils/GenericUtils';
import dict from '../assets/values/dict.json';
import {DimensionsUtils} from '../utils/DimensionUtils';

const ConfirmationModal = ({label, onPressPositive, onPressNegative}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.spaceHor}>
      <Text style={styles.title}>{label}</Text>

      <View style={[styles.rowCenterBetween, styles.spaceTop]}>
        <Button
          disabled={loading}
          onPress={onPressNegative}
          label={dict.disagreeDelete}
          containerStyle={styles.keepBtn}
        />
        <Button
          loading={loading}
          disabled={loading}
          indicatorColor={Colors.white}
          label={dict.agreeDelete}
          onPress={() => {
            setLoading(true);
            onPressPositive();
          }}
          labelStyle={{color: Colors.white}}
          containerStyle={styles.deleteBtn}
        />
      </View>
    </View>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(32),
  },
  spaceHor: {
    marginHorizontal: DimensionsUtils.getDP(20),
  },
  title: {
    color: Colors.white,
    fontSize: DimensionsUtils.getFontSize(16),
    fontFamily: 'Poppins-Regular',
  },
  subtitle: {
    color: Colors.white,
    marginTop: DimensionsUtils.getDP(8),
  },
  keepBtn: {
    width: (WIDTH - 56) / 2,
  },
  deleteBtn: {
    backgroundColor: Colors.fillRed,
    width: (WIDTH - 56) / 2,
  },
});
