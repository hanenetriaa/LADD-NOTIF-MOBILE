import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/actions/authActions/auth';

const Navbar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Button
          color="secondary" 
          style={styles.navItem}
          onPress={() => navigation.navigate('Users')}>
          <Text>Users</Text>
        </Button>
        <Button
          color="secondary"
          style={styles.navItem}
          onPress={() => navigation.navigate('Messages')}>
          <Text>Messages</Text>
        </Button>
        <Button
          color="secondary"
          style={styles.navItem}
          onPress={() => navigation.navigate('Accounts')}>
          <Text>Accounts</Text>
        </Button>
        <Button
          color="error"
          style={styles.logoutButton}
          onPress={() => dispatch(logoutUser())}>
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f2f2f2',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: 'white',
  },
});

export default Navbar;
