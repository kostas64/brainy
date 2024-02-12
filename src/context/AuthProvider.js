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
  });

  //** ----- EFFECTS -----
  React.useEffect(() => {
    // Fetch token and user's data
    const bootstrapAsync = async () => {
      let userToken, userEmail, userAvatar, userName, userSurname;

      try {
        userToken = await AsyncStorage.getItem('token');
        userEmail = await AsyncStorage.getItem('email');
        userAvatar = await AsyncStorage.getItem('avatar');
        userName = await AsyncStorage.getItem('name');
        userSurname = await AsyncStorage.getItem('surname');

        setToken(userToken);
        setUser({
          avatar: userAvatar,
          email: userEmail,
          name: userName,
          surname: userSurname,
        });
      } catch (e) {
        setToken(null);
        setUser({
          avatar: null,
          email: null,
          isGuest: null,
          name: null,
          surname: null,
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
