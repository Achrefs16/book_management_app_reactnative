import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import AddEditBookScreen from './screens/AddEditBookScreen';
import LoginScreen from './screens/LoginScreen';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { token, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {!token ? (
          // Auth Stack
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
        ) : (
          // App Stack
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Book Management' }}
            />
            <Stack.Screen 
              name="BookDetail" 
              component={BookDetailScreen} 
              options={{ title: 'Book Details' }}
            />
            <Stack.Screen 
              name="AddBook" 
              component={AddEditBookScreen} 
              options={{ title: 'Add New Book' }}
            />
            <Stack.Screen 
              name="EditBook" 
              component={AddEditBookScreen} 
              options={{ title: 'Edit Book' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 