import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import Button from '../common/Button';
import {Colors} from '../../utils/Colors';
import MenuItem from '../common/MenuItem';
import {signOut} from '../../services/auth';
import {WIDTH} from '../../utils/GenericUtils';
import dict from '../../assets/values/dict.json';
import {useStorage} from '../../hooks/useStorage';
import {LOGOUT} from '../../assets/values/profile';
import {LIST_GAMES} from '../../assets/values/games';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import ProfileScoresSectionItem from './ProfileScoresSectionItem';

const ProfileScoresSection = ({passedScores}) => {
  const navigation = useNavigation();

  const [scores] = useStorage('scores', []);
  const {user, setToken, setUser} = useAuthContext();

  const listHeight = useSharedValue(192);
  const [btnLabel, setBtnLabel] = React.useState(dict.showMoreLabel);

  //** ----- STYLES -----
  const listAnim = useAnimatedStyle(() => ({height: listHeight.value}), []);

  //** ----- FUNCTIONS -----
  const renderItem = React.useCallback(
    ({item, index}) => (
      <ProfileScoresSectionItem
        item={item}
        scores={scores}
        key={`game-${index}`}
        passedScores={passedScores}
      />
    ),
    [],
  );

  const onPressShowMore = React.useCallback(() => {
    const newHeight =
      listHeight.value === 192 ? Math.round(LIST_GAMES.length / 2) * 96 : 192;

    setBtnLabel(old =>
      old === dict.showLessLabel ? dict.showMoreLabel : dict.showLessLabel,
    );

    listHeight.value = withTiming(newHeight);
  }, [listHeight]);

  const logout = React.useCallback(async () => {
    navigation.pop();
    !user?.isGuest && (await signOut(setToken, setUser, true));
  }, [user?.isGuest, navigation, setToken, setUser]);

  if (user?.isGuest) {
    return (
      <View style={styles.spaceHor}>
        <MenuItem
          isAlone
          onPress={logout}
          icon={LOGOUT.icon}
          label={LOGOUT.title}
          key={'profile-last'}
          iconStyle={styles.smallIcon}
          labelStyle={styles.logoutRed}
        />
      </View>
    );
  }

  return (
    <>
      <Text style={styles.bestScoresLabel}>{dict.bestScores}</Text>

      <Animated.View style={[styles.container, listAnim]}>
        <FlatList
          numColumns={2}
          bounces={false}
          data={LIST_GAMES}
          scrollEnabled={false}
          renderItem={renderItem}
        />
      </Animated.View>

      <Button
        label={btnLabel}
        onPress={onPressShowMore}
        labelStyle={styles.btnLabel}
        containerStyle={styles.btnContainer}
      />
    </>
  );
};

export default ProfileScoresSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  bestScoresLabel: {
    marginLeft: 16,
    color: Colors.halfWhite,
    fontFamily: 'Poppins-Medium',
    marginBottom: DimensionsUtils.getDP(8),
    fontSize: DimensionsUtils.getFontSize(18),
  },
  smallIcon: {
    tintColor: Colors.fillRed,
    width: DimensionsUtils.getDP(18),
    height: DimensionsUtils.getDP(18),
    marginLeft: DimensionsUtils.getDP(4),
    marginRight: DimensionsUtils.getDP(8),
  },
  btnContainer: {
    backgroundColor: Colors.tabBarBg,
    minHeight: DimensionsUtils.getDP(32),
    borderRadius: DimensionsUtils.getDP(8),
    width: WIDTH - DimensionsUtils.getDP(32),
    marginBottom: DimensionsUtils.getDP(32),
  },
  btnLabel: {
    color: Colors.tabBarIcon,
    fontSize: DimensionsUtils.getFontSize(12),
  },
  spaceHor: {
    marginTop: DimensionsUtils.getDP(24),
    borderRadius: DimensionsUtils.getDP(14),
    marginHorizontal: DimensionsUtils.getDP(16),
    backgroundColor: Colors.tabBarBg,
  },
  logoutRed: {
    color: Colors.fillRed,
  },
});
