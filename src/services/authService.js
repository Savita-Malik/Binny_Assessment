import * as Keychain from 'react-native-keychain';

export async function saveToken(token) {
  try {
    await Keychain.setGenericPassword('authToken', token);
    console.log('✅ Token saved securely');
  } catch (error) {
    console.error('❌ Error saving token:', error);
  }
}

export async function getToken() {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username === 'authToken') {
      return credentials.password; // this is your token
    }
    return null;
  } catch (error) {
    console.error('❌ Error retrieving token:', error);
    return null;
  }
}
