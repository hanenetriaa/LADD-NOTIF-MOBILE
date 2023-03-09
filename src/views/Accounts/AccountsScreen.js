import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SearchAccounts} from '../../redux/actions/accountActions/searchAccounts';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';

const AccountsScreen = () => {
  const navigation = useNavigation();

  const handleDetailsAccount = accountId => {
    navigation.navigate('DetailsAccount', {accountId});
  };

  const dispatch = useDispatch();
  const {accountList, loading, error} = useSelector(state => state.accounts);
  console.log(accountList);
  useEffect(() => {
    dispatch(SearchAccounts());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!accountList) {
    return <Text>Loading...</Text>;
  }

  if (accountList.length === 0) {
    return <Text>No Accounts found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts List</Text>
      <FlatList
        data={accountList}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>ID: {item.accountId}</Text>
            <Text style={styles.cardText}>name: {item.name}</Text>
            <Text style={styles.cardText}>status: {item.status}</Text>
            <Button
              title="View Details"
              onPress={() => handleDetailsAccount(item.accountId)}
            />
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
export default AccountsScreen;
