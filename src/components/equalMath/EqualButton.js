import {Pressable, Text, StyleSheet, Dimensions} from 'react-native';

import {GenericUtils} from '../../utils/GenericUtils';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const {width: WIDTH} = Dimensions.get('window');

const EqualButton = ({disabled = false, onPress, insets, label}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {
          opacity: disabled ? 0.4 : 1,
          marginBottom:
            insets.bottom > 0 ? insets.bottom : DimensionsUtils.getDP(16),
          height: DimensionsUtils.getDP(52),
        },
      ]}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: DimensionsUtils.getDP(8),
    marginHorizontal: DimensionsUtils.getDP(16),
    width: WIDTH - DimensionsUtils.getDP(32),
  },
  buttonLabel: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: DimensionsUtils.getFontSize(24),
  },
});

export default EqualButton;
