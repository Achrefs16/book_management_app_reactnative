import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';
import { Card, Title, Paragraph, Button, ActivityIndicator, Text } from 'react-native-paper';

export default function BookDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { fetchBookById, removeBook } = useBooks();
  const { token } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadBook();
    }
  }, [id, token]);

  const loadBook = async () => {
    const bookData = await fetchBookById(id, token);
    setBook(bookData);
    setLoading(false);
  };

  const handleDelete = async () => {
    const success = await removeBook(id, token);
    if (success) {
      navigation.goBack();
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centered}>
        <Text>Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Title>{book.title}</Title>
          <Paragraph>Author: {book.author}</Paragraph>
          <Paragraph>Genre: {book.genre}</Paragraph>
          <Paragraph>Published: {book.publishedYear}</Paragraph>
          <Paragraph>ISBN: {book.isbn}</Paragraph>
          <Paragraph>Pages: {book.pages}</Paragraph>
          <Paragraph>Description: {book.description}</Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('EditBook', { book })}
          style={styles.button}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          onPress={handleDelete}
          style={[styles.button, styles.deleteButton]}
        >
          Delete
        </Button>
      </View>
    </ScrollView>
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
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
}); 