export const requestAccess = async user => {
  try {
    return fetch(`http://192.168.2.17:3000/users/requestAccess`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: user?.idToken,
        name: user?.user?.givenName,
        surname: user?.user?.familyName,
        avatar: user?.user?.photo,
        email: user?.user?.email,
      }),
    });
  } catch (e) {
    console.log('API requestAccess failed', e);
  }
};
