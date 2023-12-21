/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {evaluate} from 'mathjs';
import FastImage from 'react-native-fast-image';

import {Colors} from '../../utils/Colors';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimPress = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(FastImage);

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

  React.useEffect(() => {
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
    ).start();
  }, []);

  return (
    modalOpen && (
      <Animated.View style={[styles.container, {opacity: opacityRef}]}>
        <AnimPress onPress={closeModal} style={styles.backgroundContainer} />
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.innerTitleContainer}>
              <FastImage
                source={require('../../assets/images/tutorial.png')}
                style={styles.icon}
              />
              <Text style={styles.title}>{dict.doTheMathTutTitle}</Text>
            </View>
            <TouchableOpacity onPress={closeModal}>
              <FastImage
                source={require('../../assets/images/close.png')}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.gameContainer}>
            <Pressable
              onPress={changeEquations}
              disabled={
                evaluate(equation1.replace('x', '*')) <=
                evaluate(equation2.replace('x', '*'))
              }>
              <Card value={equation1} />
              {evaluate(equation1.replace('x', '*')) >
                evaluate(equation2.replace('x', '*')) && (
                <AnimatedImage
                  source={require('../../assets/images/tap.png')}
                  style={[
                    styles.cardGesture,
                    {
                      transform: [{rotate: '90deg'}, {scale: scaleRef}],
                    },
                  ]}
                />
              )}
            </Pressable>
            <View style={{marginVertical: DimensionsUtils.getDP(2)}} />
            <Pressable
              onPress={changeEquations}
              disabled={
                evaluate(equation1.replace('x', '*')) >=
                evaluate(equation2.replace('x', '*'))
              }>
              <Card value={equation2} />
              {evaluate(equation1.replace('x', '*')) <
                evaluate(equation2.replace('x', '*')) && (
                <AnimatedImage
                  source={require('../../assets/images/tap.png')}
                  style={[
                    styles.cardGesture,
                    {
                      transform: [{rotate: '90deg'}, {scale: scaleRef}],
                    },
                  ]}
                />
              )}
            </Pressable>
          </View>
          <Pressable
            style={styles.equalButtonContainer}
            onPress={changeEquations}
            disabled={
              evaluate(equation1.replace('x', '*')) !==
              evaluate(equation2.replace('x', '*'))
            }>
            {evaluate(equation1.replace('x', '*')) ===
              evaluate(equation2.replace('x', '*')) && (
              <AnimatedImage
                source={require('../../assets/images/tap.png')}
                style={[
                  styles.cardGesture,
                  {
                    transform: [{rotate: '90deg'}, {scale: scaleRef}],
                  },
                ]}
              />
            )}
            <View style={styles.equalButton}>
              <Text style={styles.equalText}>{dict.equalLabel}</Text>
            </View>
          </Pressable>
          <Text style={{marginTop: DimensionsUtils.getDP(8)}}>
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
  },
  innerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: DimensionsUtils.getDP(52),
    height: DimensionsUtils.getDP(52),
  },
  title: {
    marginLeft: DimensionsUtils.getDP(16),
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(22),
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
  text: {
    color: Colors.black,
    fontSize: DimensionsUtils.getFontSize(16),
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default EqualMathTutorial;
