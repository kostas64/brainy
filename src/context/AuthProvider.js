import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState({
    avatar: null,
    email: null,
    isGuest: null,
    name: null,
    surname: null,
    nickname: null,
  });

  //** ----- FUNCTIONS -----
  const updateUser = React.useCallback(async () => {
    if (user?.name) {
      await AsyncStorage.setItem('name', user?.name);
    }

    if (user?.surname) {
      await AsyncStorage.setItem('surname', user?.surname);
    }

    if (user?.nickname) {
      await AsyncStorage.setItem('nickname', user?.nickname);
    }

    if (user?.avatar) {
      await AsyncStorage.setItem('avatar', `${user?.avatar}`);
    }
  }, [user.name, user.avatar, user.surname, user.nickname]);

  //** ----- EFFECTS -----
  React.useEffect(() => {
    updateUser();
  }, [updateUser]);

  React.useEffect(() => {
    // Fetch token and user's data
    const bootstrapAsync = async () => {
      let userToken, userEmail, userAvatar, userName, userSurname, userNickname;

      try {
        userToken = await AsyncStorage.getItem('token');
        userEmail = await AsyncStorage.getItem('email');
        userAvatar = await AsyncStorage.getItem('avatar');
        userName = await AsyncStorage.getItem('name');
        userSurname = await AsyncStorage.getItem('surname');
        userNickname = await AsyncStorage.getItem('nickname');

        setToken(userToken);
        setUser({
          avatar: userAvatar,
          email: userEmail,
          name: userName,
          surname: userSurname,
          nickname: userNickname,
        });
      } catch (e) {
        setToken(null);
        setUser({
          avatar: null,
          email: null,
          isGuest: null,
          name: null,
          surname: null,
          nickname: null,
        });
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};
