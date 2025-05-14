import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useBooks } from '../../../src/context/BookContext';
import { useAuth } from '../../../src/context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EditBookScreen() {
  const { id } = useLocalSearchParams();
  const { fetchBookById, editBook } = useBooks();
  const { token } = useAuth();
  const router = useRouter();
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
    if (token) {
      loadBook();
    }
  }, [id, token]);

  const loadBook = async () => {
    const bookData = await fetchBookById(id, token);
    if (bookData) {
      setFormData({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        genre: bookData.genre,
        publishedYear: bookData.publishedYear.toString(),
        isbn: bookData.isbn,
        pages: bookData.pages.toString(),
        imageUrl: bookData.imageUrl,
      });
    }
  };

  const handleSubmit = async () => {
    const bookData = {
      ...formData,
      publishedYear: parseInt(formData.publishedYear) || 0,
      pages: parseInt(formData.pages) || 0,
    };

    const success = await editBook(id, bookData, token);
    if (success) {
      router.back();
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
        Update Book
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