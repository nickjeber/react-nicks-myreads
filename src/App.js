import React from "react";
import { Route, Link } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import Search from "./components/Search";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

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

  getAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({
        booksReading: books.filter(book => book.shelf === "currentlyReading"),
        booksWanted: books.filter(book => book.shelf === "wantToRead"),
        booksRead: books.filter(book => book.shelf === "read")
      });
    });
  }

  handleBookChange(book, newShelfId) {
    BooksAPI.update(book, newShelfId).then(() => {
      this.getAllBooks(); 
    });
  }

  render() {
    const allBooks = [
      ...this.state.booksReading,
      ...this.state.booksWanted,
      ...this.state.booksRead
    ];
    console.log('All Books', allBooks);
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title="Currently Reading"
                    books={this.state.booksReading}
                    onChange={(book, newBookshelf) =>
                      this.handleBookChange(book, newBookshelf)
                    }
                  />
                  <BookShelf
                    title="Want to Read"
                    books={this.state.booksWanted}
                    onChange={(book, newBookshelf) =>
                      this.handleBookChange(book, newBookshelf)
                    }
                  />
                  <BookShelf
                    title="Read"
                    books={this.state.booksRead}
                    onChange={(book, newBookshelf) =>
                      this.handleBookChange(book, newBookshelf)
                    }
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" />
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <Search
              allBooks={allBooks}
              handleBookChange={this.handleBookChange}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
