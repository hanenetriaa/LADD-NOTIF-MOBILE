import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {getAccount} from '../../redux/actions/accountActions/getAccount';
import {useRoute} from '@react-navigation/native';

const DetailsAccountScreen = () => {
  const {params} = useRoute();
  const {accountId} = params;

  const dispatch = useDispatch();
  const {account, loading, error} = useSelector(state => state.detailsAccount);
  console.log(account);

  useEffect(() => {
    dispatch(getAccount(accountId));
  }, [dispatch, accountId]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!account) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>ID:</Text>
        <Text style={styles.detailsText}>{account.accountId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Name:</Text>
        <Text style={styles.detailsText}>{account.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Status:</Text>
        <Text style={styles.detailsText}>{account.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333333',
  },
  detailsText: {
    flex: 1,
    color: '#333333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsAccountScreen;
