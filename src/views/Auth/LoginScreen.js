import React, {useState, useRef} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../redux/actions/authActions/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailInputRef = useRef(null); // création d'une référence pour l'élément TextInput email
  const passwordInputRef = useRef(null); // création d'une référence pour l'élément TextInput password

  const handleSignUp = () => {
    navigation.navigate('Register');
  };
  const handleLogin = () => {
    // email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // at least 8 characters, 1 letter, and 1 number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email',
        visibilityTime: 3000,
        autoHide: true,
      });
      emailInputRef.current.focus(); // focus sur l'élément TextInput email en cas d'email invalide
      return;
    }
    if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password ',
        visibilityTime: 3000,
        autoHide: true,
      });
      passwordInputRef.current.focus(); // focus sur l'élément TextInput password en cas de mot de passe invalide
      return;
    }
    dispatch(loginUser(email, password));
  };
  const handleForgetPassword = () => {
    navigation.navigate('Password');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        ref={emailInputRef} // assignation de la référence de l'élément TextInput email
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        ref={passwordInputRef} // assignation de la référence de l'élément TextInput password
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Button title="Register" onPress={handleSignUp} style={styles.button} />
      <Button
        title="ForgetPassword"
        onPress={handleForgetPassword}
        style={styles.button}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default LoginScreen;
