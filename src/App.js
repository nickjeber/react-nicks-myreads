import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import Search from './components/Search' 
import './App.css'

class BooksApp extends React.Component {
   constructor(props) {
    super(props);
    this.updateBookShelf = this.updateBookShelf.bind(this);
    this.state = {
      booksReading: [], 
      booksWanted: [], 
      booksRead: []
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books });
    });
  }

  updateBookShelf(bookId, oldShelfId, newShelfId) {
    BooksAPI.update({ id: bookId }, newShelfId).then((books) => {
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
                                (book, newBookshelf) => this.onChange(book, newBookshelf, this.state.booksReading, false)} />
                            <BookShelf title="Want to Read" books={this.state.booksWanted} onChange={
                                (book, newBookshelf) => this.onChange(book, newBookshelf, this.state.booksWanted, false)} />
                            <BookShelf title="Read" books={this.state.booksRead} onChange={
                                (book, newBookshelf) => this.onChange(book, newBookshelf, this.state.booksRead, false)} />
                        </div>
                        
                    </div>
                    <div className="open-search"><Link to="/search">
                      
                          <Route path="/search" render={( {history} ) => (
                            <Search booksShelved={this.state.books} handleBookChange={this.handleBookChange} />
                          )}/>
                        
                      </Link>
                    </div>
                </div>
                )} />

               
            </div>
        )
    }
}

export default BooksApp
