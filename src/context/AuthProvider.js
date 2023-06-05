import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState({
    avatar: null,
    email: null,
  });

  React.useEffect(() => {
    // Fetch token and user's data
    const bootstrapAsync = async () => {
      let userToken, userEmail;

      try {
        userToken = await AsyncStorage.getItem('token');
        userEmail = await AsyncStorage.getItem('email');
        userAvatar = await AsyncStorage.getItem('avatar');

        setToken(userToken);
        setUser({
          avatar: userAvatar,
          email: userEmail,
        });
      } catch (e) {
        setToken(null);
        setUser({
          avatar: null,
          email: null,
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
