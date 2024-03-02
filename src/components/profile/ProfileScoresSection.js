import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../utils/Colors';
import MenuItem from '../common/MenuItem';
import {signOut} from '../../services/auth';
import {WIDTH} from '../../utils/GenericUtils';
import dict from '../../assets/values/dict.json';
import {useStorage} from '../../hooks/useStorage';
import {LOGOUT} from '../../assets/values/profile';
import {LIST_GAMES} from '../../assets/values/games';
import {getAdaptedScores} from '../../utils/StringUtils';
import {useAuthContext} from '../../context/AuthProvider';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const ProfileScoresSection = ({passedScores}) => {
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
      <View style={styles.container}>
        {LIST_GAMES.map((item, index) => (
          <View key={`game-${index}`} style={styles.itemContainer}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.label} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.score}>
              {getAdaptedScores(item.title, scores, passedScores)}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
};

export default ProfileScoresSection;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  bestScoresLabel: {
    marginLeft: 16,
    color: Colors.halfWhite,
    fontFamily: 'Poppins-Medium',
    marginBottom: DimensionsUtils.getDP(8),
    fontSize: DimensionsUtils.getFontSize(18),
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
