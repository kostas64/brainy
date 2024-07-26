import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const HomeButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.pop();
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={images.home} style={styles.img} />
    </Pressable>
  );
};

export default HomeButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DimensionsUtils.getDP(12),
    backgroundColor: Colors.tabBarBg,
    height: 50,
    width: 50,
  },
  img: {
    tintColor: Colors.white,
    width: DimensionsUtils.getDP(24),
    height: DimensionsUtils.getDP(24),
  },
});
