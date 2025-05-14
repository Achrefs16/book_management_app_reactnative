import { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useBooks } from '../src/context/BookContext';
import { useAuth } from '../src/context/AuthContext';
import { Card, Title, Paragraph, ActivityIndicator, Text, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { books, loading, error, fetchBooks } = useBooks();
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchBooks(token);
    }
  }, [token]);

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
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => router.push(`/book/${item.id}`)}
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
        onPress={() => router.push('/book/add')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
}); 