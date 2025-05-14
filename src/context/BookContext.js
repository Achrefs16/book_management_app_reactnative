import React, { createContext, useState, useContext } from 'react';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../services/bookService';
import Book from '../models/Book';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (token) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllBooks(token);
      setBooks(data.map(book => new Book(book)));
    } catch (err) {
      setError('Failed to fetch books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookById = async (id, token) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBookById(id, token);
      return new Book(data);
    } catch (err) {
      setError('Failed to fetch book details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book, token) => {
    try {
      setLoading(true);
      setError(null);
      const newBook = await createBook(book, token);
      setBooks(prevBooks => [...prevBooks, new Book(newBook)]);
      return true;
    } catch (err) {
      setError('Failed to add book');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const editBook = async (id, book, token) => {
    try {
      setLoading(true);
      setError(null);
      const updatedBook = await updateBook(id, book, token);
      setBooks(prevBooks => 
        prevBooks.map(b => b.id === id ? new Book(updatedBook) : b)
      );
      return true;
    } catch (err) {
      setError('Failed to update book');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async (id, token) => {
    try {
      setLoading(true);
      setError(null);
      const success = await deleteBook(id, token);
      if (success) {
        setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete book');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider value={{
      books,
      loading,
      error,
      fetchBooks,
      fetchBookById,
      addBook,
      editBook,
      removeBook
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext); 