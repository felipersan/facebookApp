import React from 'react'
import { StyleSheet, Text, View, Platform, Button } from 'react-native'
import {
  useAuthRequest,
  makeRedirectUri,
  AuthRequestConfig,
  DiscoveryDocument
} from 'expo-auth-session'

import { maybeCompleteAuthSession } from 'expo-web-browser';
import Constants from 'expo-constants';




export default function App() {

maybeCompleteAuthSession();

const useProxy = Constants.appOwnership === 'expo' && false;



const discovery: DiscoveryDocument = {
  authorizationEndpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v6.0/oauth/access_token'
}

const config: AuthRequestConfig = {
  clientId: '910491159993698',
  scopes: ['public_profile', 'user_likes'],
  redirectUri: makeRedirectUri({
    native: 'fb910491159993698://authorize', 
    useProxy
  }),
  extraParams: {
    display: Platform.select({ web: 'popup' })!
  }
}

  const [request, response, promptAsync] = useAuthRequest(config, discovery)

  return (
    <View style={styles.container}>
      <Button onPress={() => promptAsync( {useProxy} )} title="Login" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})