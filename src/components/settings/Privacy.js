import React from 'react';
import {Linking, Pressable, StyleSheet, Text} from 'react-native';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const PrivacyItem = ({label, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.privacyItemText}>{label}</Text>
    </Pressable>
  );
};

const Privacy = () => {
  const openURL = url => {
    Linking.openURL(url);
  };

  return (
    <>
      <PrivacyItem
        label={dict.privacyPolicy}
        onPress={() => openURL(dict.privacyPolicyURL)}
      />
      <PrivacyItem
        label={dict.support}
        onPress={() => openURL(dict.supportURL)}
      />
    </>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  privacyItemText: {
    color: Colors.tabBarIcon,
    fontFamily: 'Poppins-Regular',
    paddingVertical: DimensionsUtils.getDP(8),
  },
});
