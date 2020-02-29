import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import List from './partials/List';

export default class Reads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: '',
            reads: [],
            books: [],
        };
    }
    
    startRead(e){
        e.preventDefault();
        axios.post('http://localhost:3000/reads/start', {
           book: this.state.book 
        }, {
            headers: { authorization: localStorage.getItem('token') }  
        }).then(response => {
            console.log(response);
        });
    }

    componentDidMount(){
        axios.get('http://localhost:3000/reads/list', 
        {
            headers: { authorization: localStorage.getItem('token') }  
        }).then(response => {
            console.log(response.data);
            this.setState({reads: response.data});
        });

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
                <h3>Current Reads</h3>
                <ul className="list">
                    {this.state.reads.map(read => (
                        <List item={read}>
                            {read.book.title} 
                            <button className="delete-btn">Finish</button>
                            <Link className="notes-btn" to={'notes/' + read._id}>Notes</Link>
                        </List>
                    ))}
                    
                </ul>
                <h3>Start New Read</h3>
                <form onSubmit={this.startRead}>
                    <div className="form-control">
                    <select>
                        <option value="">- select book -</option>
                        {this.state.books.map(book => (
                            <option key={book._id} value={book._id}>{book.title}</option>
                        ))}
                    </select>
                    </div>
                    <div className="form-control">
                    </div>
                    <button className="btn">Start</button>
                </form>
            </div>
        )
    }
}
