import {
  runOnJS,
  withTiming,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../utils/Colors';
import images from '../../assets/images/images';
import {AVATARS} from '../../assets/values/avatars';
import {DimensionsUtils} from '../../utils/DimensionUtils';
import UserProfileModalAnimatedAvatar from './UserProfileModalAnimatedAvatar';

const UserProfileModalAvatar = ({
  user,
  icon,
  name,
  imgSize,
  nameStyle,
  contStyle,
  imgContStyle,
}) => {
  const progress = useSharedValue(0);

  const avatarRef = React.useRef();
  const [show, setShow] = React.useState(false);
  const [avatarPos, setAvatarPos] = React.useState();

  const source = icon
    ? icon
    : typeof user?.avatar === 'number'
    ? AVATARS[user?.avatar]
    : images.guest;

  //** ----- FUNCTIONS -----
  const onPress = React.useCallback(() => {
    avatarRef.current?.measureInWindow((x, y) => {
      setAvatarPos({x, y});
      setShow(true);
    });
  }, []);

  const onPressOut = React.useCallback(() => {
    progress.value = withTiming(0, {duration: 400}, () => {
      runOnJS(setShow)(false);
      runOnJS(setAvatarPos)({x: 0, y: 0});
    });
  }, [progress]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    if (avatarPos?.x > 0 && avatarPos?.y > 0 && show) {
      progress.value = withSpring(1, {damping: 15});
    }
  }, [avatarPos, show, progress]);

  return (
    <>
      <Pressable
        ref={avatarRef}
        onPress={onPress}
        disabled={user?.isGuest}
        style={[styles.avatarContainer, contStyle]}>
        <View style={[styles.avatarInnerContainer, imgContStyle]}>
          <FastImage
            source={source}
            defaultSource={images.guest}
            style={{width: imgSize, height: imgSize, borderRadius: imgSize / 2}}
          />
        </View>
      </Pressable>
      <Text style={[styles.name, nameStyle]}>{name}</Text>
      <UserProfileModalAnimatedAvatar
        show={show}
        source={source}
        imgSize={imgSize}
        progress={progress}
        avatarPos={avatarPos}
        onPressOut={onPressOut}
      />
    </>
  );
};

export default UserProfileModalAvatar;

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 3,
    borderRadius: 40,
    alignSelf: 'center',
    borderColor: Colors.appGreen,
  },
  avatarInnerContainer: {
    borderWidth: 2,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.tabBarBg,
  },
  name: {
    alignSelf: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: DimensionsUtils.getFontSize(18),
    color: Colors.appGreen,
    marginTop: DimensionsUtils.getDP(8),
    marginBottom: DimensionsUtils.getDP(16),
  },
});
