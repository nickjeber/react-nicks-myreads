import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import Search from './components/Search' 
import './App.css'

class BooksApp extends React.Component {
   constructor(props) {
    super(props);
    this.handleBookChange = this.handleBookChange.bind(this);
    this.state = {
      booksReading: [], 
      booksWanted: [], 
      booksRead: []
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

// using VS Code I see some potentially unused sections of code below, but it started working so I left it. Would love feedback on what could be better. 

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ 
          booksReading: books.filter(book => book.shelf === 'currentlyReading'),
          booksWanted: books.filter(book => book.shelf === 'wantToRead'), 
          booksRead: books.filter(book => book.shelf === 'read')
         });
    });
  }

  handleBookChange(book, newShelfId) {
    console.log(arguments)
    BooksAPI.update(book, newShelfId).then(() => {
      this.getAllBooks();
    });
  }

 render() {
        return (
            <div className="app">

                <Route exact path='/' render={() => (
                    <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf title="Currently Reading" books={this.state.booksReading} onChange={
                                (book, newBookshelf) => this.handleBookChange(book, newBookshelf)} />
                            <BookShelf title="Want to Read" books={this.state.booksWanted} onChange={
                                (book, newBookshelf) => this.handleBookChange(book, newBookshelf)} />
                            <BookShelf title="Read" books={this.state.booksRead} onChange={
                                (book, newBookshelf) => this.handleBookChange(book, newBookshelf)} />
                        </div>
                        
                    </div>
                    <div className="open-search"><Link to="/search"></Link>
                    </div>
                </div>
                )} />
                <Route path="/search" render={( {history} ) => (
                    <Search booksShelved={this.state.books} handleBookChange={this.handleBookChange} />
                )}/>
               
            </div>
        )
    }
}

export default BooksApp
