import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const [averagePagesPerBook, setAveragePagesPerBook] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    pages: 0,
  });

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Biography'];

  const addBook = () => {
    const { title, author, genre, pages } = newBook;
    if (title && author && genre && pages > 0) {
      const newTotalPagesRead = totalPagesRead + pages;
      const newBooks = [{ title, author, genre, pages }, ...books];

      setTotalPagesRead(newTotalPagesRead);
      setBooks(newBooks);

      const newAveragePagesPerBook = newTotalPagesRead / newBooks.length;
      setAveragePagesPerBook(newAveragePagesPerBook);

      setNewBook({
        title: '',
        author: '',
        genre: 'Fiction',
        pages: 0,
      });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./download.png')} style={styles.image} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Book Tracker</Text>
      </View>

      <View style={styles.lastBookContainer}>
        <Text style={styles.sectionTitle}>Last Book Read</Text>
        {books.length > 0 ? (
          <FlatList
            data={[books[0]]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.bookDetail}>Title: {item.title}</Text>
                <Text style={styles.bookDetail}>Author: {item.author}</Text>
                <Text style={styles.bookDetail}>Genre: {item.genre}</Text>
                <Text style={styles.bookDetail}>Pages: {item.pages}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No books recorded yet</Text>
        )}
      </View>

      <View style={styles.statisticsContainer}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.statDetail}>Total Pages Read: {totalPagesRead}</Text>
        <Text style={styles.statDetail}>Average Pages per Book: {averagePagesPerBook.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Book</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add New Book</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newBook.title}
            onChangeText={(text) => setNewBook({ ...newBook, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />
          <View style={styles.dropdownContainer}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.dropdownButton,
                  newBook.genre === genre ? { backgroundColor: '#007AFF' } : null,
                ]}
                onPress={() => setNewBook({ ...newBook, genre: genre })}
              >
                <Text
                  style={[
                    styles.dropdownButtonText,
                    newBook.genre === genre ? { color: '#FFF' } : null,
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Number of Pages"
            value={newBook.pages.toString()}
            onChangeText={(text) => setNewBook({ ...newBook, pages: parseInt(text) || 0 })}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addBookButton} onPress={addBook}>
            <Text style={styles.addBookButtonText}>Add Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// This is my style sheet, here you will see the colours,text,text size i have used for the stylying of my display.

const styles = StyleSheet.create({
  modalContainer: {
    flex: 20,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'red', 
  },
  input: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  addBookButton: {
    backgroundColor: 'lightblue', 
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addBookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
  },
  cancelButton: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0BBED8',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000', 
  },
  lastBookContainer: {
    marginBottom: 45,
    backgroundColor: '#03FCA5',
    borderRadius: 10,
    padding: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000', 
  },
  bookDetail: {
    fontSize: 30,
    color: '#000', 
  },
  statisticsContainer: {
    marginBottom: 45,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 5,
  },
  statDetail: {
    fontSize: 30,
    color: '#000', 
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#FFB90F',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 30,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdownButton: {
    backgroundColor: '#c90076', 
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dropdownButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white', 
  },
});

export default HomePage;
