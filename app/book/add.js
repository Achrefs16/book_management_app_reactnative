import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator, Text } from 'react-native-paper';
import { useBooks } from '../../src/context/BookContext';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'expo-router';

export default function AddBookScreen() {
  const { addBook } = useBooks();
  const { token } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate required fields
      if (!formData.title || !formData.author) {
        setError('Title and Author are required');
        return;
      }

      const bookData = {
        ...formData,
        publishedYear: parseInt(formData.publishedYear) || 0,
        pages: parseInt(formData.pages) || 0,
      };

      console.log('Submitting book data:', bookData);
      console.log('Using token:', token);

      const success = await addBook(bookData, token);
      console.log('Add book result:', success);

      if (success) {
        router.back();
      } else {
        setError('Failed to add book. Please try again.');
      }
    } catch (err) {
      console.error('Error adding book:', err);
      setError('An error occurred while adding the book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      
      <TextInput
        label="Title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Author"
        value={formData.author}
        onChangeText={(text) => setFormData({ ...formData, author: text })}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Description"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        multiline
        numberOfLines={3}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Genre"
        value={formData.genre}
        onChangeText={(text) => setFormData({ ...formData, genre: text })}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Published Year"
        value={formData.publishedYear}
        onChangeText={(text) => setFormData({ ...formData, publishedYear: text })}
        keyboardType="numeric"
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="ISBN"
        value={formData.isbn}
        onChangeText={(text) => setFormData({ ...formData, isbn: text })}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Pages"
        value={formData.pages}
        onChangeText={(text) => setFormData({ ...formData, pages: text })}
        keyboardType="numeric"
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Image URL"
        value={formData.imageUrl}
        onChangeText={(text) => setFormData({ ...formData, imageUrl: text })}
        style={styles.input}
        disabled={loading}
      />
      <Button 
        mode="contained" 
        onPress={handleSubmit} 
        style={styles.button}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : 'Add Book'}
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
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
}); 