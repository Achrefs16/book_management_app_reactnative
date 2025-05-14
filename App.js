import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { BookProvider } from './src/context/BookContext';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/AppNavigator';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <BookProvider>
          <AppNavigator />
        </BookProvider>
      </AuthProvider>
    </PaperProvider>
  );
} 