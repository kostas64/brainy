/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, Animated, Pressable, Image, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {useInteraction} from '../../hooks/useInteraction';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const Card = React.forwardRef(
  ({value, flipToFrontStyle, flipToBackStyle}, ref) => {
    return (
      <View style={styles.rowCenter}>
        <Animated.View style={[styles.back, flipToFrontStyle(ref)]}>
          <Text style={styles.cardLabel}>{'?'}</Text>
        </Animated.View>
        <View style={{marginRight: DimensionsUtils.getDP(8)}} />
        <Animated.View style={[styles.front, flipToBackStyle(ref)]}>
          <Text style={styles.cardLabel}>{value}</Text>
        </Animated.View>
      </View>
    );
  },
);

const CardMemoryTutorial = ({modalOpen, setModalOpen}) => {
  const rotateRef1 = React.useRef(new Animated.Value(0)).current;
  const rotateRef2 = React.useRef(new Animated.Value(0)).current;
  const rotateRef3 = React.useRef(new Animated.Value(0)).current;
  const rotateRef4 = React.useRef(new Animated.Value(0)).current;

  const opacityRef = React.useRef(new Animated.Value(1)).current;

  //** ----- STYLES -----
  const flipToFrontStyle = React.useCallback(ref => {
    return {
      transform: [
        {
          rotateY: ref.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };
  }, []);

  const flipToBackStyle = React.useCallback(ref => {
    return {
      transform: [
        {
          rotateY: ref.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    };
  }, []);

  //** ----- FUNCTIONS -----
  const closeModal = React.useCallback(() => {
    Animated.timing(opacityRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => modalOpen && setModalOpen(false));
  }, []);

  //** ----- EFFECTS -----
  useInteraction(
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotateRef1, {
            delay: 500,
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateRef2, {
            delay: 1250,
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotateRef1, {
            toValue: 0,
            delay: 150,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateRef2, {
            toValue: 0,
            delay: 150,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotateRef1, {
            delay: 500,
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateRef4, {
            delay: 1250,
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotateRef2, {
            delay: 500,
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateRef3, {
            delay: 1250,
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(rotateRef1, {
            toValue: 0,
            delay: 500,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateRef2, {
            toValue: 0,
            delay: 500,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateRef3, {
            toValue: 0,
            delay: 500,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(rotateRef4, {
            toValue: 0,
            delay: 500,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start(),
  );

  return (
    modalOpen && (
      <>
        <Animated.View
          accessible
          style={[styles.container, {opacity: opacityRef}]}>
          <Pressable onPress={closeModal} style={styles.backgroundContainer} />
          <View style={styles.innerContainer} accessible>
            <View style={styles.titleContainer} accessible>
              <View style={styles.innerTitleContainer}>
                <Image source={images.tutorial} style={styles.icon} />
                <Text style={styles.title}>{dict.memoryCardTutTitle}</Text>
              </View>
              <Touchable
                testID="pressOut"
                onPress={closeModal}
                releasingAnimationDuraiton={300}>
                <Image source={images.close} style={styles.closeIcon} />
              </Touchable>
            </View>
            <View style={styles.rowCenter}>
              <Card
                value={'A'}
                ref={rotateRef1}
                flipToFrontStyle={flipToFrontStyle}
                flipToBackStyle={flipToBackStyle}
              />
              <Card
                value={'B'}
                ref={rotateRef2}
                flipToFrontStyle={flipToFrontStyle}
                flipToBackStyle={flipToBackStyle}
              />
            </View>
            <View style={styles.rowCenter}>
              <Card
                value={'B'}
                ref={rotateRef3}
                flipToFrontStyle={flipToFrontStyle}
                flipToBackStyle={flipToBackStyle}
              />
              <Card
                value={'A'}
                ref={rotateRef4}
                flipToFrontStyle={flipToFrontStyle}
                flipToBackStyle={flipToBackStyle}
              />
            </View>
            <Text style={styles.text}>{dict.memoryCardTutContent}</Text>
          </View>
        </Animated.View>
      </>
    )
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
  },
  innerContainer: {
    backgroundColor: Colors.white,
    borderRadius: DimensionsUtils.getDP(12),
    padding: DimensionsUtils.getDP(16),
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DimensionsUtils.getDP(8),
  },
  innerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: DimensionsUtils.getDP(50),
    height: DimensionsUtils.getDP(50),
  },
  title: {
    marginLeft: DimensionsUtils.getDP(16),
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(20),
    fontFamily: 'Poppins-SemiBold',
  },
  closeIcon: {
    width: DimensionsUtils.getDP(36),
    height: DimensionsUtils.getDP(36),
  },
  rowCenter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  front: {
    height: DimensionsUtils.getDP(48),
    width: DimensionsUtils.getDP(48),
    backgroundColor: Colors.appGreen,
    borderRadius: DimensionsUtils.getDP(12),
    marginBottom: DimensionsUtils.getDP(8),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  back: {
    height: DimensionsUtils.getDP(48),
    width: DimensionsUtils.getDP(48),
    backgroundColor: 'rgba(255,135,135,0.9)',
    borderRadius: DimensionsUtils.getDP(12),
    marginBottom: DimensionsUtils.getDP(8),
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(22),
    color: Colors.black,
  },
  text: {
    color: Colors.black,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
    marginTop: DimensionsUtils.getDP(8),
    fontSize: DimensionsUtils.getFontSize(16),
  },
});

export default CardMemoryTutorial;
