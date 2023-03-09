import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SearchMessages} from '../../redux/actions/messageActions/searchMessage.js';

const MessagesScreen = () => {
  const dispatch = useDispatch();
  const {messageList, loading, error} = useSelector(state => state.messages);
  console.log(messageList);
  useEffect(() => {
    dispatch(SearchMessages());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  if (!messageList) {
    return <Text>Loading...</Text>;
  }

  if (messageList.length === 0) {
    return <Text>No Messages found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages List</Text>
      <FlatList
        data={messageList}
        renderItem={({item}) => (
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>MessagesId: {item.messageId}</Text>
            <Text style={styles.cardText}>
              accountId: {item.accountId.name}
            </Text>
            <Text style={styles.cardText}>status {item.status}</Text>
            <Text style={styles.cardText}>type: {item.type}</Text>
            <Text style={styles.cardText}>recipient {item.recipient}</Text>
            <Text style={styles.cardText}>sentAt: {item.sentAt}</Text>
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

export default MessagesScreen;
