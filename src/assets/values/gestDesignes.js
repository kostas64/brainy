import React from 'react';
import {View, Image} from 'react-native';

import images from '../images/images';
import {Colors} from '../../utils/Colors';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const row = {
  flexDirection: 'row',
};

const selfCenter = {
  alignSelf: 'center',
};

const itemsCenter = {
  alignItems: 'center',
};

const image = {
  tintColor: Colors.white,
  width: DimensionsUtils.getDP(28),
  height: DimensionsUtils.getDP(28),
};

const horSpace = {
  marginHorizontal: DimensionsUtils.getDP(2),
};

const verSpace = {
  marginVertical: DimensionsUtils.getDP(4),
};

const gestImg = images.arrowBlack;

const transform = deg => {
  return {transform: [{rotate: `${deg}deg`}]};
};

export const GEST_DESIGNS = [
  {
    design: (
      <View>
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'UP',
  },
  {
    design: (
      <View>
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={[image, transform(180)]} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'DOWN',
  },
  {
    design: (
      <View style={row}>
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'UP',
  },
  {
    design: (
      <View style={row}>
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={[image, transform(180)]} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'DOWN',
  },
  {
    design: (
      <View style={row}>
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={[image, transform(90)]} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'RIGHT',
  },
  {
    design: (
      <View style={itemsCenter}>
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <View style={row}>
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
        </View>
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'UP',
  },
  {
    design: (
      <View style={itemsCenter}>
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <View style={row}>
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={[image, transform(90)]} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
        </View>
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'RIGHT',
  },
  {
    design: (
      <View style={row}>
        <View>
          <Image source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(56)}} />
          <Image source={gestImg} style={[image, transform(90)]} />
        </View>
        <View style={selfCenter}>
          <Image source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(18)}} />
          <Image source={gestImg} style={[image, transform(90)]} />
        </View>
        <Image source={gestImg} style={[image, selfCenter, transform(90)]} />
      </View>
    ),
    designDirection: 'RIGHT',
  },
  {
    design: (
      <View style={row}>
        <View>
          <Image source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(56)}} />
          <Image source={gestImg} style={[image, transform(90)]} />
        </View>
        <View style={selfCenter}>
          <Image source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(18)}} />
          <Image source={gestImg} style={[image, transform(90)]} />
        </View>
        <Image source={gestImg} style={[image, selfCenter, transform(270)]} />
      </View>
    ),
    designDirection: 'LEFT',
  },
  {
    design: (
      <View style={[itemsCenter, transform(45)]}>
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <View style={row}>
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={[image, transform(225)]} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
          <View style={horSpace} />
          <Image source={gestImg} style={image} />
        </View>
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
        <View style={verSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'LEFT',
  },
  {
    design: (
      <View
        style={[row, transform(270), {marginLeft: DimensionsUtils.getDP(42)}]}>
        <View>
          <Image source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(56)}} />
          <Image source={gestImg} style={[image, transform(90)]} />
        </View>
        <View style={selfCenter}>
          <Image source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(18)}} />
          <Image source={gestImg} style={[image, transform(90)]} />
        </View>
        <Image source={gestImg} style={[image, selfCenter]} />
      </View>
    ),
    designDirection: 'LEFT',
  },
  {
    design: (
      <View
        style={[
          row,
          transform(90),
          {
            marginTop: DimensionsUtils.getDP(56),
          },
        ]}>
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
        <View style={horSpace} />
        <Image source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'RIGHT',
  },
];
