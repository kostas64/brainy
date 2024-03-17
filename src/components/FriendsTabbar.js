import React from 'react';
import Share from 'react-native-share';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../utils/Colors';
import dict from '../assets/values/dict.json';
import {isAndroid} from '../utils/GenericUtils';
import {DimensionsUtils} from '../utils/DimensionUtils';
import {useToastContext} from '../context/ToastProvider';
import {shareOptions} from '../assets/values/shareOptions';

const FriendsTabbar = props => {
  const scrollRef = React.useRef();
  const {setToast} = useToastContext();

  const navState = props.navigationState;
  const selectedItem = navState?.index;

  //** ----- STYLES -----
  const tabStyles = index => [
    styles.tabContainer,
    selectedItem === index && styles.selected,
  ];

  //** ----- FUNCTIONS -----
  const scrollToFirst = React.useCallback(() => {
    scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    props.jumpTo('first');
  }, [props]);
  const onPress = React.useCallback(
    item => {
      if (item.key === 'first') {
        scrollToFirst();
      } else if (item.key === 'second') {
        props.jumpTo(item.key);
      } else if (item.key === 'third') {
        props.jumpTo(item.key);
        onPressShare();
      }
    },
    [props, scrollToFirst, onPressShare],
  );

  const onPressShare = React.useCallback(async () => {
    scrollRef.current.scrollToEnd({animated: true});

    Share.open(shareOptions)
      .then(res => {
        scrollToFirst();

        //On success show toast
        if (res.success) {
          setToast({message: dict.thanksOnSharing});
        }
      })
      .catch(err => console.log('Error ', err));
  }, [setToast, scrollToFirst]);

  return (
    <View>
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {navState.routes?.map((item, index) => (
          <Pressable
            style={tabStyles(index)}
            onPress={() => onPress(item)}
            key={`friends-tabbar-${index}`}>
            <Text style={styles.label}>{item.title}</Text>
            {selectedItem === index && <View style={styles.indicator} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default FriendsTabbar;

const styles = StyleSheet.create({
  scrollContainer: {
    height: 60,
    marginTop: DimensionsUtils.getDP(16),
    paddingLeft: DimensionsUtils.getDP(16),
  },
  tabContainer: {
    height: 38,
    justifyContent: 'center',
    backgroundColor: Colors.veryLightGrey,
    paddingHorizontal: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(30),
    marginTop: DimensionsUtils.getDP(8),
    marginRight: DimensionsUtils.getDP(16),
  },
  label: {
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    top: isAndroid ? 1 : 0,
  },
  selected: {
    backgroundColor: Colors.appGreen,
  },
  indicator: {
    top: 46,
    position: 'absolute',
    alignSelf: 'center',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.appGreen,
  },
});
