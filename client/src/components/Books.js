import React, { Component } from 'react';
import axios from 'axios';

export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: '',
            author: '',
            numberOfPages: '',
            books: [],
        };
    }
    
    addBook(e){
        e.preventDefault();
        axios.post('http://localhost:3000/books', {
           title: this.state.book,
           author: this.state.author,
           numberOfPages: this.state.numberOfPages,
        }, {
            headers: { authorization: localStorage.getItem('token') }  
        }).then(response => {
            console.log(response);
            if(response.status == 200){
                this.state = {
                    book: '',
                    author: '',
                    numberOfPages: '',
                };
            }
        });
    }

    componentDidMount(){
        axios.get('http://localhost:3000/books', 
        {
            headers: { authorization: localStorage.getItem('token') }  
        }).then(response => {
            console.log(response.data);
            this.setState({books: response.data});
        });
    }

    render() {
        return (
            <div>
                <h3>New book</h3>
                <form onSubmit={this.addBook.bind(this)}>
                <div className="form-control">
                        <input type="text" placeholder="Title" value={this.state.book} onChange={(e) => this.setState({book: e.target.value })} />
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Author" value={this.state.author} onChange={(e) => this.setState({author: e.target.value })} />
                    </div>
                    <div className="form-control">
                        <input type="number" placeholder="Number of Pages" value={this.state.numberOfPages} onChange={(e) => this.setState({numberOfPages: e.target.value })} />
                    </div>
                    <button className="btn">Add</button>
                </form>
                <hr/>
                <h3>My Books</h3>
                <ul className="list">
                    {this.state.books.map(book => (
                        <li className="minus" key={book._id}>
                            {book.title}  <em>{book.author}</em>
                        </li>
                    ))}
                    
                </ul>
            </div>
        )
    }
}
