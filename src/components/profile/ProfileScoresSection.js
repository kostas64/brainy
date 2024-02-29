import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../utils/Colors';
import MenuItem from '../common/MenuItem';
import {signOut} from '../../services/auth';
import {WIDTH} from '../../utils/GenericUtils';
import dict from '../../assets/values/dict.json';
import {useStorage} from '../../hooks/useStorage';
import {LIST_GAMES} from '../../assets/values/games';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {PROFILE_SECTIONS_3} from '../../assets/values/profile';

const ProfileScoresSection = () => {
  const navigation = useNavigation();

  const [scores] = useStorage('scores', []);
  const {user, setToken, setUser} = useAuthContext();

  //** ----- FUNCTIONS -----
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
          key={'profile-last'}
          iconStyle={styles.smallIcon}
          labelStyle={styles.logoutRed}
          icon={PROFILE_SECTIONS_3.icon}
          label={PROFILE_SECTIONS_3.title}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {LIST_GAMES.map((item, index) => {
        const ms = scores[item.title]?.[0]?.milliseconds;
        const points = scores[item.title]?.[0]?.points;
        const scoreLabel = `${`${
          ms
            ? `${ms / 1000}s (${scores[item.title]?.[0]?.flips} flips)`
            : `${points} points (${scores[item.title]?.[0]?.correctness}%)`
        }`}`;
        const score = !!ms || !!points ? scoreLabel : dict?.gamesNoScore;

        return (
          <View key={`game-${index}`} style={styles.itemContainer}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.label} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.score}>{score}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default ProfileScoresSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  itemContainer: {
    height: 82,
    paddingLeft: DimensionsUtils.getDP(12),
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: Colors.tabBarBg,
    width: (WIDTH - 48) / 2,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    position: 'absolute',
    top: DimensionsUtils.getDP(12),
    right: DimensionsUtils.getDP(10),
  },
  label: {
    lineHeight: 17,
    color: Colors.appGreen,
    fontFamily: 'Poppins-Bold',
    width: (WIDTH - 156) / 2,
  },
  score: {
    justifyContent: 'space-between',
    color: Colors.halfWhite,
    fontFamily: 'Poppins-Regular',
  },
  smallIcon: {
    tintColor: Colors.fillRed,
    width: DimensionsUtils.getDP(18),
    height: DimensionsUtils.getDP(18),
    marginLeft: DimensionsUtils.getDP(4),
    marginRight: DimensionsUtils.getDP(8),
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
