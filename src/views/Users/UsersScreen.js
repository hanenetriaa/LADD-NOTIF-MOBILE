import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {searchUsers} from '../../redux/actions/userActions/searchUsers.js';

const UsersScreen = () => {
  const dispatch = useDispatch();
  const {userList, loading, error} = useSelector(state => state.users);
  console.log(userList);
  useEffect(() => {
    dispatch(searchUsers());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!userList) {
    return <Text>Loading...</Text>;
  }

  if (userList.length === 0) {
    return <Text>No users found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={userList}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>ID: {item.userId}</Text>
            <Text style={styles.cardText}>Email: {item.email}</Text>
            <Text style={styles.cardText}>First Name: {item.firstName}</Text>
            <Text style={styles.cardText}>Last Name: {item.lastName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333333',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  cardText: {
    fontSize: 18,
    color: '#333333',
    lineHeight: 24,
  },
});
export default UsersScreen;
