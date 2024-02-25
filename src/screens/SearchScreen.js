import {
  View,
  FlatList,
  Keyboard,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Colors} from '../utils/Colors';
import {searchUser} from '../services/user';
import useTimeout from '../hooks/useTimeout';
import {DimensionsUtils} from '../utils/DimensionUtils';
import SearchInput from '../components/search/SearchInput';
import {WIDTH, isAndroid, isIOS} from '../utils/GenericUtils';
import SearchListItem from '../components/search/SearchListItem';

const SearchScreen = ({onPressArrow}) => {
  const timeout = useTimeout();
  const keyboard = useTimeout();
  const insets = useSafeAreaInsets();

  const inputRef = React.useRef();
  const [page, setPage] = React.useState(1);
  const [input, setInput] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loadingApi, setLoadingApi] = React.useState(false);
  const [noOtherData, setNoOtherData] = React.useState(false);

  const inputWidth = useSharedValue(40);
  const arrowOpacity = useSharedValue(0);

  //** ----- STYLES -----
  const insetsBottom =
    insets.bottom > 0
      ? insets.bottom + DimensionsUtils.getDP(4)
      : DimensionsUtils.getDP(24);

  const contStyles = [
    styles.container,
    {paddingTop: insets.top > 0 ? insets.top : DimensionsUtils.getDP(24)},
  ];

  const listStyles = [styles.spaceHorizontal, {paddingBottom: insetsBottom}];

  const arrowContStyle = useAnimatedStyle(
    () => ({opacity: arrowOpacity.value}),
    [],
  );

  const listItemStyle = useAnimatedStyle(
    () => ({opacity: arrowOpacity.value}),
    [],
  );

  const inputStyle = useAnimatedStyle(
    () => ({
      width: inputWidth.value,
      paddingRight: inputWidth.value > 200 ? 36 : 0,
      ...(isIOS ? {fontFamily: 'Poppins-Regular'} : {}),
    }),
    [],
  );

  //** ----- FUNCTIONS -----
  const onPressBack = React.useCallback(() => {
    arrowOpacity.value = withTiming(0, {duration: 150});
    inputWidth.value = withTiming(40, {duration: 150});
    inputRef.current?.blur();

    timeout.current = setTimeout(() => {
      onPressArrow();
    }, 150);
  }, [timeout, inputWidth, arrowOpacity, onPressArrow]);

  const renderItem = React.useCallback(
    ({item, index}) => (
      <SearchListItem
        item={item}
        style={listItemStyle}
        key={`search-user-${index}`}
      />
    ),
    [listItemStyle],
  );

  const onEndReached = React.useCallback(() => {
    if (!noOtherData && !loadingApi && input.length > 0) {
      setLoadingApi(true);

      searchUser(input, page + 1)
        .then(data => {
          setResults(old => [...old, ...data]);
          setPage(old => old + 1);
          data.length < 20 && setNoOtherData(true);
        })
        .finally(() => setLoadingApi(false));
    }
  }, [input, page, loadingApi, noOtherData]);

  const onScroll = React.useCallback(() => {
    if (results.length > 0) {
      Keyboard.isVisible() && Keyboard.dismiss();
    }
  }, [results]);

  const ListFooter = React.useCallback(() => {
    if (loadingApi && page !== 1) {
      return (
        <ActivityIndicator
          size={'small'}
          color={Colors.appGreen}
          style={styles.spaceBottom}
        />
      );
    }
  }, [page, loadingApi]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    arrowOpacity.value = withTiming(1, {duration: 150});
    inputWidth.value = withTiming(WIDTH - DimensionsUtils.getDP(62), {
      duration: 200,
    });

    if (isAndroid) {
      keyboard.current = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      inputRef.current?.focus();
    }
  }, [timeout, keyboard, inputWidth, arrowOpacity]);

  return (
    <View style={contStyles}>
      <SearchInput
        ref={inputRef}
        setPage={setPage}
        setInput={setInput}
        inputStyle={inputStyle}
        loadingApi={loadingApi}
        setResults={setResults}
        onPressBack={onPressBack}
        setLoadingApi={setLoadingApi}
        setNoOtherData={setNoOtherData}
        arrowContStyle={arrowContStyle}
      />

      <FlatList
        data={results}
        onScroll={onScroll}
        renderItem={renderItem}
        style={styles.spaceTop}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.4}
        ListFooterComponent={ListFooter}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={listStyles}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  spaceTop: {
    marginTop: DimensionsUtils.getDP(8),
  },
  spaceHorizontal: {
    marginHorizontal: DimensionsUtils.getDP(16),
  },
  spaceBottom: {
    marginBottom: DimensionsUtils.getDP(16),
  },
});
