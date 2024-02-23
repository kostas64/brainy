import {
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';

import {Colors} from '../../utils/Colors';
import {searchUser} from '../../services/user';
import images from '../../assets/images/images';
import useTimeout from '../../hooks/useTimeout';
import {DimensionsUtils} from '../../utils/DimensionUtils';

const AnimPress = Animated.createAnimatedComponent(Pressable);
const AnimInput = Animated.createAnimatedComponent(TextInput);

const SearchInput = React.forwardRef(
  (
    {
      setPage,
      setInput,
      loadingApi,
      setResults,
      inputStyle,
      onPressBack,
      setLoadingApi,
      arrowContStyle,
      setNoOtherData,
    },
    ref,
  ) => {
    const searchTimeout = useTimeout();

    const onChangeHandler = React.useCallback(
      value => {
        clearTimeout(searchTimeout.current);
        value.length > 0 && setLoadingApi(true);

        setPage(1);
        setInput(value);

        value.length === 0 && setResults([]);
        value.length === 0 && setLoadingApi(false);
        value.length === 0 && setNoOtherData(false);

        searchTimeout.current = setTimeout(() => {
          if (value.length > 0) {
            searchUser(value)
              .then(data => {
                setResults(data);

                data.length < 20 && setNoOtherData(true);
                data.length === 20 && setNoOtherData(false);
              })
              .finally(() => setLoadingApi(false));
          }
        }, 250);
      },
      [
        setPage,
        searchTimeout,
        setLoadingApi,
        setInput,
        setResults,
        setNoOtherData,
      ],
    );

    return (
      <View style={styles.inputRowContainer}>
        <AnimPress
          onPress={onPressBack}
          style={[styles.chevronContainer, arrowContStyle]}>
          <Image style={styles.chevron} source={images.arrowDown} />
        </AnimPress>

        <AnimInput
          ref={ref}
          onChangeText={onChangeHandler}
          placeholder={'Search players'}
          selectionColor={Colors.appGreen}
          style={[styles.input, inputStyle]}
          placeholderTextColor={Colors.tabBarIcon}
        />

        {loadingApi && (
          <View style={styles.loader}>
            <ActivityIndicator size={'small'} color={Colors.appGreen} />
          </View>
        )}
      </View>
    );
  },
);

export default SearchInput;

const styles = StyleSheet.create({
  inputRowContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: DimensionsUtils.getDP(6),
    paddingRight: DimensionsUtils.getDP(16),
  },
  chevronContainer: {
    padding: DimensionsUtils.getDP(10),
  },
  chevron: {
    tintColor: Colors.appGreen,
    transform: [{rotate: '90deg'}],
    width: DimensionsUtils.getDP(20),
    height: DimensionsUtils.getDP(20),
  },
  input: {
    height: 40,
    color: Colors.white,
    borderColor: Colors.appGreen,
    borderWidth: DimensionsUtils.getDP(2),
    paddingLeft: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(24),
  },
  loader: {
    top: 10,
    position: 'absolute',
    right: DimensionsUtils.getDP(28),
  },
});
