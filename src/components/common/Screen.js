import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from './Header';
import {Colors} from '../../utils/Colors';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Screen = ({
  label,
  noIcon,
  hasDot,
  children,
  iconStyle,
  customIcon,
  labelStyle,
  secondIcon,
  onIconPress,
  headerStyle,
  onPressOutside,
  onScndIcnPress,
}) => {
  const {user} = useAuthContext();
  const insets = useSafeAreaInsets();

  //** ----- STYLES -----
  const contStyles = [
    styles.container,
    {paddingTop: insets.top > 24 ? insets.top : DimensionsUtils.getDP(24)},
  ];

  return (
    <View style={contStyles} onStartShouldSetResponder={onPressOutside}>
      <Header
        label={label}
        noIcon={noIcon}
        hasDot={hasDot}
        iconStyle={iconStyle}
        avatar={user?.avatar}
        secondIcon={secondIcon}
        labelStyle={labelStyle}
        isGuest={user?.isGuest}
        customIcon={customIcon}
        headerStyle={headerStyle}
        onIconPress={onIconPress}
        onScndIcnPress={onScndIcnPress}
      />
      {children}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
