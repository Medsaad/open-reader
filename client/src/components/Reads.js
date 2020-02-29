import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import List from './partials/List';
import { ReaderData } from '../Context';
import { logoutIfUnauthorized } from './helpers';
import { FaBookMedical, FaBookmark, FaRegCheckCircle } from 'react-icons/fa';


export default class Reads extends Component {
    static contextType = ReaderData;

    constructor(props) {
        super(props);
        this.state = {
            book: '',
            reads: [],
            authorizedUser: localStorage.getItem('token') ? true : false
        };
    }

    startRead(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/reads/start', {
            book: this.state.book
        }, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            console.log(response);
        }).catch(err => {
            logoutIfUnauthorized(err);
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3000/reads/list',
            {
                headers: { authorization: localStorage.getItem('token') }
            }).then(response => {
                this.setState({ reads: response.data });
            }).catch(err => {
                logoutIfUnauthorized(err);
            });
    }

    render() {
        const { books } = this.context;
        if (!this.state.authorizedUser)
            return <Redirect to='/' />

        return (
            <div>
                <h3>Current Reads</h3>
                <ul className="list">
                    {this.state.reads.map(read => (
                        <List key={read._id} item={read}>
                            {read.book.title}
                            <div>
                                <button className="delete-btn"><FaRegCheckCircle /> Finish</button>
                                <Link className="notes-btn" to={'notes/' + read._id}><FaBookmark /> Notes</Link>
                            </div>
                        </List>
                    ))}

                </ul>
                <h3>Start New Read</h3>
                <form onSubmit={this.startRead}>
                    <div className="form-control">
                        <select>
                            <option value="">- select book -</option>
                            {books.map(book => (
                                <option key={book._id} value={book._id}>{book.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control">
                    </div>
                    <button className="btn"><FaBookMedical /> Start</button>
                </form>
            </div>
        )
    }
}
