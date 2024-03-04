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
  const {setToast} = useToastContext();

  const navState = props.navigationState;
  const selectedItem = navState?.index;

  //** ----- STYLES -----
  const tabStyles = index => [
    styles.tabContainer,
    selectedItem === index && styles.selected,
  ];

  //** ----- FUNCTIONS -----
  const onPress = React.useCallback(
    item => {
      props.jumpTo(item.key);
    },
    [props],
  );

  const onPressShare = React.useCallback(async () => {
    Share.open(shareOptions)
      .then(res => {
        //On success show toast
        if (res.success) {
          setToast({message: dict.thanksOnSharing});
        }
      })
      .catch(err => console.log('Error ', err));
  }, [setToast]);

  return (
    <View>
      <ScrollView
        horizontal
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
        <Pressable
          onPress={onPressShare}
          key={'friends-tabbar-invite'}
          style={[styles.tabContainer, styles.spaceRight]}>
          <Text style={styles.label}>{dict.profileInvite}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default FriendsTabbar;

const styles = StyleSheet.create({
  scrollContainer: {
    height: 60,
    marginTop: DimensionsUtils.getDP(16),
  },
  tabContainer: {
    height: 38,
    justifyContent: 'center',
    backgroundColor: Colors.veryLightGrey,
    paddingHorizontal: DimensionsUtils.getDP(16),
    borderRadius: DimensionsUtils.getDP(30),
    marginTop: DimensionsUtils.getDP(8),
    marginLeft: DimensionsUtils.getDP(16),
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

  spaceRight: {
    marginRight: DimensionsUtils.getDP(16),
  },
});
