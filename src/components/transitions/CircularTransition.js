import React from 'react';
import {Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const CircularTransition = ({posX, posY}) => {
  const navigation = useNavigation();
  const scaleRef = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (posX > 0 && posY > 0) {
      Animated.timing(scaleRef, {
        toValue: 80,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate('GamesStack', {
          screen: 'Games',
          params: {
            backTransition: () =>
              Animated.timing(scaleRef, {
                toValue: 0,
                duration: 850,
                useNativeDriver: true,
              }).start(),
          },
        });
      });
    }
  }, [posX, posY]);

  return (
    <>
      <Animated.View
        style={{
          zIndex: 10000,
          position: 'absolute',
          top: posY - DimensionsUtils.getDP(24),
          left: posX - DimensionsUtils.getDP(24),
          backgroundColor: Colors.appGreen,
          width: DimensionsUtils.getDP(42),
          height: DimensionsUtils.getDP(42),
          borderRadius: DimensionsUtils.getDP(24),
          transform: [{scale: scaleRef}],
        }}
      />
      <Animated.View
        style={{
          zIndex: 10001,
          position: 'absolute',
          top: posY - DimensionsUtils.getDP(14),
          left: posX - DimensionsUtils.getDP(14),
          backgroundColor: Colors.background,
          width: DimensionsUtils.getDP(28),
          height: DimensionsUtils.getDP(28),
          borderRadius: DimensionsUtils.getDP(14),
          transform: [{scale: scaleRef}],
        }}
      />
    </>
  );
};

export default CircularTransition;
