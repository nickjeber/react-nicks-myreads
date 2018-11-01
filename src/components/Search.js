import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
class Search extends Component {
  static propTypes = {
    allBooks: PropTypes.array,
    handleBookChange: PropTypes.func.isRequired
  };

  state = {
    query: "",
    books: []
  };

  updateQuery = query => {
    this.setState({ query });
  };

  clearQuery = () => {
    this.setState({ query: "", books: [] });
  };

  handleBookSearch = query => {
    if (!query) {
      this.clearQuery(query);
    } else {
      this.updateQuery(query);

      BooksAPI.search(query.trim(), 20).then(books => {
        if (!books.error) {
          let updatedBooks = Search.getUpdatedBooks(books, this.props.allBooks);
          this.setState({ books: updatedBooks });
        } else {
          this.setState({ books: [] });
        }
      });
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {

    let updatedBooks = Search.getUpdatedBooks(prevState.books, nextProps.allBooks);

    return { books: updatedBooks };
  }

  static getUpdatedBooks(books, allBooks) {

    let updatedBooks = books.map(book => {
      let found = allBooks.filter(item => item.id === book.id);
      if (found.length > 0) {
        book.shelf = found[0].shelf;
      }
      return book;
    });

    return updatedBooks;
  }

  render() {
    const { handleBookChange } = this.props;
    const { query, books } = this.state;
    let bookSearchResult;

    if (query) {
      console.log(books);
      const match = new RegExp(escapeRegExp(query), "i");
      bookSearchResult = books.filter(book => match.test(book.title));
    } else {
      bookSearchResult = books;
    }
    bookSearchResult.sort(sortBy("title"));
    console.log(bookSearchResult);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              autoFocus
              placeholder="Search by Title"
              value={query}
              onChange={event => this.handleBookSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {bookSearchResult.length !== 0 && (
            <div className="showing-books">
              <span>
                {" "}
                {bookSearchResult.length} results found for the query{" "}
                <b>{query}</b>
              </span>
            </div>
          )}
          <ol className="books-grid">
            {bookSearchResult.map(book => {
              return (
                <Book
                  key={book.id}
                  book={book}
                  handleBookChange={handleBookChange}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
