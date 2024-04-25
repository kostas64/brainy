import Animated, {
  runOnJS,
  withTiming,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../../utils/Colors';
import {HEIGHT, WIDTH} from '../../utils/GenericUtils';
import {getAdaptedScores} from '../../utils/StringUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import {convertArrayToObject} from '../../utils/ArrayUtils';
import ProfileScoresSectionItemExtended from './ProfileScoresSectionItemExtended';

const AnimPress = Animated.createAnimatedComponent(Pressable);

const duration = 400;
const INIT_HEIGHT = 80;
const FULL_HEIGHT = DimensionsUtils.getDP(170);

const ProfileScoresSectionItem = React.forwardRef(
  ({item, index, scrollRef, scores, passedScores}, ref) => {
    const progress = useSharedValue(0);
    const insets = useSafeAreaInsets();

    const itemRef = React.useRef();
    const scrollFromMe = React.useRef();
    const [show, setShow] = React.useState(false);
    const [posBox, setPosBox] = React.useState({});
    const [showScores, setShowScores] = React.useState(null);

    const headerY =
      insets.top > 24 ? insets.top : DimensionsUtils.getDP(24) + 44;

    const scoresToPass =
      passedScores?.length > 0 ? convertArrayToObject(passedScores) : scores;

    //** ----- STYLES -----
    const contAnim = useAnimatedStyle(() => {
      const input = [0, 1];

      return {
        height: interpolate(progress.value, input, [INIT_HEIGHT, FULL_HEIGHT]),
        width: interpolate(progress.value, input, [
          (WIDTH - 48) / 2,
          WIDTH - 32,
        ]),
        transform: [
          {
            translateX:
              index % 2 === 0
                ? 0
                : interpolate(progress.value, input, [0, -((WIDTH - 16) / 2)]),
          },
        ],
      };
    });

    //** ----- FUNCTIONS -----
    const onPress = () => {
      itemRef.current.measureInWindow((x, y, pageX, pageY) => {
        if (y + FULL_HEIGHT > HEIGHT - 50) {
          scrollFromMe.current = true;
          scrollRef?.current?.scrollToEnd();
        } else if (y < headerY) {
          scrollFromMe.current = true;
          scrollRef?.current?.scrollTo({x: 0, y: 130});
        } else {
          setPosBox({x, y, pageX, pageY});
          animateBox();
        }
      });
    };

    const animateBox = () => {
      const toValue = progress.value === 1 ? 0 : 1;

      if (show) {
        progress.value = withTiming(toValue, {duration});
        setShowScores(false);
        setTimeout(() => {
          setShow(false);
          setShowScores(null);
        }, duration);
      } else {
        setShow(true);
        progress.value = withTiming(toValue, {duration}, () => {
          runOnJS(setShowScores)(true);
        });
      }
    };

    //** ----- EFFECTS -----
    React.useImperativeHandle(ref, () => ({
      measureAndAnimate: () => {
        if (scrollFromMe.current) {
          itemRef.current.measureInWindow((x, y) => {
            setPosBox({x, y});
            animateBox();
            scrollFromMe.current = false;
          });
        }
      },
      getIsScrolling: () => {
        return scrollFromMe.current;
      },
    }));

    return (
      <>
        <AnimPress ref={itemRef} onPress={onPress} style={styles.itemContainer}>
          <View style={styles.iconContainer}>{item.icon}</View>
          <Text style={styles.label} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.score}>
            {getAdaptedScores(item.title, scores, passedScores)}
          </Text>
        </AnimPress>
        <ProfileScoresSectionItemExtended
          item={item}
          show={show}
          posBox={posBox}
          onPress={onPress}
          contAnim={contAnim}
          scores={scoresToPass}
          showScores={showScores}
        />
      </>
    );
  },
);

export default ProfileScoresSectionItem;

const styles = StyleSheet.create({
  itemContainer: {
    height: 80,
    paddingLeft: DimensionsUtils.getDP(12),
    paddingTop: DimensionsUtils.getDP(12),
    paddingBottom: 8,
    marginRight: 16,
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
    fontSize: 13,
  },
});
