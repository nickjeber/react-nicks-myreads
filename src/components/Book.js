import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    constructor(props){
        super(props);
        this.handleBookShelfChange = this.handleBookShelfChange.bind(this);
    }

    handleBookShelfChange(event) {
        this.props.handleBookShelfChange(this.props.id, this.props.shelf, event.target.value);
    }

render() {
    return (
        <li key={this.props.id} className="book-grid-item">
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.thumbnail})` }} />
                    <div className="book-shelf-changer">
                        <select value={this.props.shelf} onChange={this.handleBookShelfChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{Array.isArray(this.props.authors) ? this.props.authors[0] : this.props.authors}</div>
            </div>
        </li> 
    );
  }
}

Book.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  shelf: PropTypes.string,
  title: PropTypes.string,
  authors: PropTypes.array,
  onBookShelfChange: PropTypes.func,
};

export default Book;