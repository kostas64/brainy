import React from 'react';

import {GAMES} from '../../assets/values/games';
import RankFlipListItem from './RankFlipListItem';
import RankPointListItem from './RankPointListItem';
import {useAuthContext} from '../../context/AuthProvider';

const RankGameItem = ({item, isLast, index, gameInput}) => {
  const {user} = useAuthContext();

  switch (gameInput) {
    case GAMES[0]:
      return (
        <RankFlipListItem
          item={item}
          index={index}
          isLast={isLast}
          isMe={!user?.isGuest && user?.email === item?.user?.[0]?.email}
        />
      );
    case GAMES[1]:
    case GAMES[2]:
    case GAMES[3]:
      return (
        <RankPointListItem
          item={item}
          index={index}
          isLast={isLast}
          isMe={!user?.isGuest && user?.email === item?.user?.[0]?.email}
        />
      );
    default:
      return null;
  }
};

export default RankGameItem;
