import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [token, setToken] = React.useState(null);
  const [name, setName] = React.useState(null);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken, userName;

      try {
        userToken = await AsyncStorage.getItem('token');
        userName = await AsyncStorage.getItem('name');

        setToken(userToken);
        setName(userName);
      } catch (e) {
        setToken(null);
        setName(null);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        name,
        setName,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
