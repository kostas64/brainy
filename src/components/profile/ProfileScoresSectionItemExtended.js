import {
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Animated, {FadeInLeft} from 'react-native-reanimated';

import {Colors} from '../../utils/Colors';
import {padArray} from '../../utils/ArrayUtils';
import {HEIGHT, WIDTH} from '../../utils/GenericUtils';
import {getAdaptedScore} from '../../utils/StringUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimPress = Animated.createAnimatedComponent(Pressable);

const ProfileScoresSectionItemExtended = ({
  show,
  item,
  onPress,
  scores,
  showScores,
  posBox,
  contAnim,
}) => {
  if (!show) {
    return null;
  }

  return (
    <Modal transparent style={styles.transparent}>
      <AnimPress onPress={onPress} style={styles.background} />
      <Animated.View
        style={[
          contAnim,
          styles.animatedContainer,
          {top: posBox.y, left: posBox.x},
        ]}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <Text style={styles.label} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.scoresContainer}>
          {showScores === null ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={Colors.appGreen} size={'small'} />
            </View>
          ) : showScores === true ? (
            padArray(scores?.[item.title], 5)?.map?.((score, key) => (
              <Animated.Text
                key={`score-${key}`}
                style={styles.scoreExt}
                entering={FadeInLeft.delay(key * 100).duration(200)}>
                {`${key + 1}. ${score ? getAdaptedScore(score) : '-'}`}
              </Animated.Text>
            ))
          ) : null}
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ProfileScoresSectionItemExtended;

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
  background: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  animatedContainer: {
    position: 'absolute',
    borderRadius: DimensionsUtils.getDP(8),
    backgroundColor: Colors.tabBarBg,
    padding: 12,
  },
  scoresContainer: {
    flex: 1,
    margin: 8,
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
  scoreExt: {
    color: Colors.halfWhite,
    fontFamily: 'Poppins-Medium',
    justifyContent: 'space-between',
    fontSize: DimensionsUtils.getFontSize(14),
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
