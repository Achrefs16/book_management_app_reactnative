import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { Card, Title, Paragraph, ActivityIndicator, Text, FAB, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const { books, loading, error, fetchBooks } = useBooks();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (token) {
      fetchBooks(token);
    }
  }, [token]);

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <FlatList
          data={books}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate('BookDetail', { id: item.id })}
            >
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.author}</Paragraph>
              </Card.Content>
            </Card>
          )}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('AddBook')}
        />
      </View>
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  container: {
    flex: 1,
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#555',
  },
  link: {
    marginTop: 4,
    alignSelf: 'center',
  },
}); 