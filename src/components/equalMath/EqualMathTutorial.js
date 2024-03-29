import React from 'react';
import {evaluate} from 'mathjs';
import {View, Text, Animated, Pressable, Image, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import Touchable from '../common/Touchable';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {useInteraction} from '../../hooks/useInteraction';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Card = ({value}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={[styles.cardText]}>{value}</Text>
    </View>
  );
};

const EqualMathTutorial = ({modalOpen, setModalOpen}) => {
  const [equation1, setEquation1] = React.useState('7 - 4');
  const [equation2, setEquation2] = React.useState('1 + 2');

  const scaleRef = React.useRef(new Animated.Value(1)).current;
  const opacityRef = React.useRef(new Animated.Value(1)).current;

  //** ----- FUNCTIONS -----
  const generateNum = () => Math.floor(Math.random() * 5) + 1;

  const generateOper = () => (Math.random() > 0.5 ? '/' : 'x');

  const closeModal = () => {
    Animated.timing(opacityRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalOpen(false));
  };

  const changeEquations = () => {
    setEquation1(`${generateNum()} ${generateOper()} ${generateNum()}`);
    setEquation2(`${generateNum()} ${generateOper()} ${generateNum()}`);
  };

  //** ----- EFFECTS -----
  useInteraction(
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleRef, {
          toValue: 1.3,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(scaleRef, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ).start(),
  );

  return (
    modalOpen && (
      <Animated.View
        accessible
        style={[styles.container, {opacity: opacityRef}]}>
        <Pressable onPress={closeModal} style={styles.backgroundContainer} />
        <View accessible style={styles.innerContainer}>
          <View accessible style={styles.titleContainer}>
            <View style={styles.innerTitleContainer}>
              <Image source={images.tutorial} style={styles.icon} />
              <Text style={styles.title}>{dict.doTheMathTutTitle}</Text>
            </View>
            <Touchable
              testID="pressOut"
              onPress={closeModal}
              releasingAnimationDuraiton={300}>
              <Image source={images.close} style={styles.closeIcon} />
            </Touchable>
          </View>
          <View style={styles.gameContainer}>
            <Touchable
              onPress={changeEquations}
              disabled={
                evaluate(equation1.replace('x', '*')) <=
                evaluate(equation2.replace('x', '*'))
              }>
              <Card value={equation1} />
              {evaluate(equation1.replace('x', '*')) >
                evaluate(equation2.replace('x', '*')) && (
                <AnimatedImage
                  source={images.tap}
                  style={[
                    styles.cardGesture,
                    {transform: [{rotate: '90deg'}, {scale: scaleRef}]},
                  ]}
                />
              )}
            </Touchable>
            <View style={{marginVertical: DimensionsUtils.getDP(2)}} />
            <Touchable
              onPress={changeEquations}
              disabled={
                evaluate(equation1.replace('x', '*')) >=
                evaluate(equation2.replace('x', '*'))
              }>
              <Card value={equation2} />
              {evaluate(equation1.replace('x', '*')) <
                evaluate(equation2.replace('x', '*')) && (
                <AnimatedImage
                  source={images.tap}
                  style={[
                    styles.cardGesture,
                    {transform: [{rotate: '90deg'}, {scale: scaleRef}]},
                  ]}
                />
              )}
            </Touchable>
          </View>
          <Touchable
            style={styles.equalButtonContainer}
            onPress={changeEquations}
            disabled={
              evaluate(equation1.replace('x', '*')) !==
              evaluate(equation2.replace('x', '*'))
            }>
            {evaluate(equation1.replace('x', '*')) ===
              evaluate(equation2.replace('x', '*')) && (
              <AnimatedImage
                source={images.tap}
                style={[
                  styles.cardGesture,
                  {transform: [{rotate: '90deg'}, {scale: scaleRef}]},
                ]}
              />
            )}
            <View style={styles.equalButton}>
              <Text style={styles.equalText}>{dict.equalLabel}</Text>
            </View>
          </Touchable>
          <Text style={styles.spaceTop}>
            <Text style={styles.text}>{dict.doTheMathTutContent}</Text>
            <Text
              style={[
                styles.text,
                styles.textBold,
              ]}>{` ${dict.doTheMathTutContent2} `}</Text>
            <Text style={styles.text}>{dict.doTheMathTutContent3}</Text>
          </Text>
        </View>
      </Animated.View>
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
  gameContainer: {
    alignItems: 'center',
    marginBottom: DimensionsUtils.getDP(8),
  },
  cardContainer: {
    alignSelf: 'center',
    borderRadius: DimensionsUtils.getDP(4),
    alignItems: 'center',
    width: DimensionsUtils.getDP(104),
    backgroundColor: 'white',
    borderColor: Colors.tabBarIcon,
    borderWidth: 2,
  },
  cardText: {
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(22),
  },
  cardGesture: {
    zIndex: 1,
    position: 'absolute',
    top: DimensionsUtils.getDP(-2),
    left: DimensionsUtils.getDP(-28),
    width: DimensionsUtils.getDP(42),
    height: DimensionsUtils.getDP(42),
  },
  equalButtonContainer: {
    width: DimensionsUtils.getDP(124),
    alignSelf: 'center',
  },
  equalButton: {
    alignSelf: 'center',
    borderRadius: DimensionsUtils.getDP(4),
    backgroundColor: Colors.appGreen,
    width: DimensionsUtils.getDP(124),
    paddingVertical: DimensionsUtils.getDP(8),
  },
  equalText: {
    color: Colors.white,
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(16),
  },
  text: {
    color: Colors.black,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
    fontSize: DimensionsUtils.getFontSize(16),
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default EqualMathTutorial;
