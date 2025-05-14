import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useBooks } from '../context/BookContext';
import { useAuth } from '../context/AuthContext';

export default function AddEditBookScreen({ route, navigation }) {
  const { book } = route.params || {};
  const { addBook, editBook } = useBooks();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
    isbn: '',
    pages: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description,
        genre: book.genre,
        publishedYear: book.publishedYear.toString(),
        isbn: book.isbn,
        pages: book.pages.toString(),
        imageUrl: book.imageUrl,
      });
    }
  }, [book]);

  const handleSubmit = async () => {
    const bookData = {
      ...formData,
      publishedYear: parseInt(formData.publishedYear) || 0,
      pages: parseInt(formData.pages) || 0,
    };

    const success = book
      ? await editBook(book.id, bookData, token)
      : await addBook(bookData, token);

    if (success) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        style={styles.input}
      />
      <TextInput
        label="Author"
        value={formData.author}
        onChangeText={(text) => setFormData({ ...formData, author: text })}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <TextInput
        label="Genre"
        value={formData.genre}
        onChangeText={(text) => setFormData({ ...formData, genre: text })}
        style={styles.input}
      />
      <TextInput
        label="Published Year"
        value={formData.publishedYear}
        onChangeText={(text) => setFormData({ ...formData, publishedYear: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="ISBN"
        value={formData.isbn}
        onChangeText={(text) => setFormData({ ...formData, isbn: text })}
        style={styles.input}
      />
      <TextInput
        label="Pages"
        value={formData.pages}
        onChangeText={(text) => setFormData({ ...formData, pages: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Image URL"
        value={formData.imageUrl}
        onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {book ? 'Update Book' : 'Add Book'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 