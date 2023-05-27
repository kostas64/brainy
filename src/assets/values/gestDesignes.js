import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
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
  width: DimensionsUtils.getDP(28),
  height: DimensionsUtils.getDP(28),
};

const horSpace = {
  marginHorizontal: DimensionsUtils.getDP(2),
};

const verSpace = {
  marginVertical: DimensionsUtils.getDP(4),
};

const gestImg = require('../images/arrow.png');

const transform = deg => {
  return {transform: [{rotate: `${deg}deg`}]};
};

export const GEST_DESIGNS = [
  {
    design: (
      <View>
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'UP',
  },
  {
    design: (
      <View>
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={[image, transform(180)]} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'DOWN',
  },
  {
    design: (
      <View style={row}>
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'UP',
  },
  {
    design: (
      <View style={row}>
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={[image, transform(180)]} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'DOWN',
  },
  {
    design: (
      <View style={row}>
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={[image, transform(90)]} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'RIGHT',
  },
  {
    design: (
      <View style={itemsCenter}>
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <View style={row}>
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
        </View>
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'UP',
  },
  {
    design: (
      <View style={itemsCenter}>
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <View style={row}>
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={[image, transform(90)]} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
        </View>
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'RIGHT',
  },
  {
    design: (
      <View style={row}>
        <View>
          <FastImage source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(56)}} />
          <FastImage source={gestImg} style={[image, transform(90)]} />
        </View>
        <View style={selfCenter}>
          <FastImage source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(18)}} />
          <FastImage source={gestImg} style={[image, transform(90)]} />
        </View>
        <FastImage
          source={gestImg}
          style={[image, selfCenter, transform(90)]}
        />
      </View>
    ),
    designDirection: 'RIGHT',
  },
  {
    design: (
      <View style={row}>
        <View>
          <FastImage source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(56)}} />
          <FastImage source={gestImg} style={[image, transform(90)]} />
        </View>
        <View style={selfCenter}>
          <FastImage source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(18)}} />
          <FastImage source={gestImg} style={[image, transform(90)]} />
        </View>
        <FastImage
          source={gestImg}
          style={[image, selfCenter, transform(270)]}
        />
      </View>
    ),
    designDirection: 'LEFT',
  },
  {
    design: (
      <View style={[itemsCenter, transform(45)]}>
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <View style={row}>
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={[image, transform(225)]} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
          <View style={horSpace} />
          <FastImage source={gestImg} style={image} />
        </View>
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={verSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'LEFT',
  },
  {
    design: (
      <View
        style={[row, transform(270), {marginLeft: DimensionsUtils.getDP(42)}]}>
        <View>
          <FastImage source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(56)}} />
          <FastImage source={gestImg} style={[image, transform(90)]} />
        </View>
        <View style={selfCenter}>
          <FastImage source={gestImg} style={[image, transform(90)]} />
          <View style={{marginVertical: DimensionsUtils.getDP(18)}} />
          <FastImage source={gestImg} style={[image, transform(90)]} />
        </View>
        <FastImage source={gestImg} style={[image, selfCenter]} />
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
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
        <View style={horSpace} />
        <FastImage source={gestImg} style={image} />
      </View>
    ),
    designDirection: 'RIGHT',
  },
];
