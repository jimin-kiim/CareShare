import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as GoogleSignIn from 'expo-google-sign-in';

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  const [state, setState] = React.useState({ user: null });

  const componentDidMount = () => {
    googleInitAsync();
  }

  const googleInitAsync = async () => {
    try {
      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        clientId: process.env.CLIENT_ID,
        // Provide other custom options...
      });
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
    googleSyncUserWithStateAsync();
  };

  const googleSyncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setState({ user });
  };

  const googleSignOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setState({ user: null });
  };

  const googleSignInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        googleSyncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  const onPress = () => {
    if (state.user) {
      googleSignOutAsync();
    } else {
      googleSignInAsync();
    }
  };

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signin screen!</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          // leftIcon={<Icon
          //   name='envelope'
          //   size={16} />} 
          autoCompleteType={undefined}        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          // leftIcon={<Icon
          //   name='key'
          //   size={16} />} 
          autoCompleteType={undefined}        />

        <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
        <Text onPress={onPress}>Google Auth</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1
  },

  control: {
    marginTop: 10,
    width: 300
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignInScreen;
