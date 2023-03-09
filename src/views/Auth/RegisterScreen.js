import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../../redux/actions/authActions/registerUser';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const {user, error} = useSelector(state => state);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    // regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // regex for password validation (minimum 8 characters)
    const passwordRegex = /^.{8,}$/;

    // check if all fields are filled
    if (!firstName || !lastName || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      return;
    }

    // check if email is valid
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email',
      });
      return;
    }

    // check if password is valid
    if (!passwordRegex.test(password)) {
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 8 characters',
      });
      return;
    }

    // create the user
    dispatch(createUser(firstName, lastName, email, password));
    // show success message
    Toast.show({
      type: 'success',
      text1: 'User created successfully!',
    });
    // navigate to login screen
    navigation.navigate('Login');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />

      <Button title="Sign Up" onPress={handleSignUp} style={styles.button} />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      {error && <Text>{error}</Text>}
      <Toast ref={ref => Toast.setRef(ref)} />
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

export default RegisterScreen;
