/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import FastImage from 'react-native-fast-image';
import {View, Text, Animated, Pressable, StyleSheet} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import dict from '../../assets/values/dict.json';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimPress = Animated.createAnimatedComponent(Pressable);

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

const Card = ({color, value}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={[styles.cardText, {color}]}>{value}</Text>
    </View>
  );
};

const CardColorTutorial = ({modalOpen, setModalOpen}) => {
  const [cardVal1, setCardVal1] = React.useState('yellow');
  const [cardCol1, setCardCol1] = React.useState(Colors.appGreen);
  const [cardVal2, setCardVal2] = React.useState('black');
  const [cardCol2, setCardCol2] = React.useState(Colors.black);

  const scaleRef = React.useRef(new Animated.Value(1)).current;
  const opacityRef = React.useRef(new Animated.Value(1)).current;

  //** ----- FUNCTIONS -----
  const closeModal = React.useCallback(() => {
    Animated.timing(opacityRef, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalOpen(false));
  }, []);

  const changeColors1 = React.useCallback(() => {
    setCardCol1(Colors.black);
    setCardVal1('red');
    setCardCol2(Colors.red);
    setCardVal2('blue');
  });

  const changeColors2 = React.useCallback(() => {
    setCardCol1(Colors.appGreen);
    setCardVal1('yellow');
    setCardCol2(Colors.black);
    setCardVal2('black');
  });

  //** ----- EFFECTS -----
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleRef, {
          toValue: 1.3,
          duration: 500,
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
              <FastImage source={images.tutorial} style={styles.icon} />
              <Text style={styles.title}>{dict.colorMatcTutTitle}</Text>
            </View>
            <Pressable onPress={closeModal}>
              <FastImage source={images.close} style={styles.closeIcon} />
            </Pressable>
          </View>
          <View style={styles.gameContainer}>
            <Pressable onPress={changeColors1} disabled={cardVal1 === cardCol2}>
              <FastImage source={images.no} style={styles.image} />
              {cardVal1 !== cardCol2 && (
                <AnimatedImage
                  source={images.tap}
                  style={[
                    styles.animatedIcon,
                    {transform: [{scale: scaleRef}]},
                  ]}
                />
              )}
            </Pressable>
            <View>
              <Card color={cardCol1} value={cardVal1} />
              <View style={{marginVertical: DimensionsUtils.getDP(2)}} />
              <Card color={cardCol2} value={cardVal2} />
            </View>
            <Pressable onPress={changeColors2} disabled={cardVal1 !== cardCol2}>
              <FastImage source={images.yes} style={styles.image} />
              {cardVal1 === cardCol2 && (
                <AnimatedImage
                  source={images.tap}
                  style={[
                    styles.animatedIcon,
                    {transform: [{scale: scaleRef}]},
                  ]}
                />
              )}
            </Pressable>
          </View>
          <Text>
            <Text style={styles.text}>{`${dict.colorMatcTutContent} `}</Text>
            <Text
              style={[
                styles.text,
                styles.textBold,
              ]}>{`${dict.colorMatcTutContent2} `}</Text>
            <Text style={styles.text}>{dict.colorMatcTutContent3}</Text>
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
  rowCenter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: DimensionsUtils.getDP(8),
  },
  image: {
    borderRadius: DimensionsUtils.getDP(4),
    width: DimensionsUtils.getDP(32),
    height: DimensionsUtils.getDP(32),
  },
  animatedIcon: {
    position: 'absolute',
    top: DimensionsUtils.getDP(22),
    left: DimensionsUtils.getDP(8),
    borderRadius: DimensionsUtils.getDP(4),
    width: DimensionsUtils.getDP(32),
    height: DimensionsUtils.getDP(32),
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
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(22),
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

export default CardColorTutorial;
