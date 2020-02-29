import React, { Component } from 'react';
import axios from 'axios';
import List from './partials/List';
import { ReaderData } from '../Context';
import { logoutIfUnauthorized } from './helpers';
import { Redirect } from 'react-router-dom';
import { FaRegTimesCircle } from 'react-icons/fa';

export default class Notes extends Component {
    static contextType = ReaderData;
    constructor(props) {
        super(props);
        this.state = {
            readId: props.match.params.readId,
            notes: [],
            note: '',
            authorizedUser: localStorage.getItem('token') ? true : false
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/sessions/${this.state.readId}/notes`,
            {
                headers: { authorization: localStorage.getItem('token') }
            }).then(response => {
                this.setState({ notes: response.data });
            }).catch(err => {
                logoutIfUnauthorized(err);
            });
    }

    addNote(e) {
        e.preventDefault();
        axios.post(`http://localhost:3000/sessions/${this.state.readId}/notes`, {
            note: this.state.note,
        }, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            if (response.status == 200) {
                this.setState({ note: '' });
            }

            let notes = this.state.notes;
            notes.push(response.data.note);
            this.setState({ notes });

        }).catch(err => {
            if(err.response)
                logoutIfUnauthorized(err);
            else 
                console.log(err);
        });
    }

    deleteNote(noteId){
        axios.delete(`http://localhost:3000/sessions/${this.state.readId}/notes/${noteId}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            let notes = this.state.notes.filter((note) => note._id !== noteId);
            this.setState({ notes });
        }).catch(err => {
            if(err.response)
                logoutIfUnauthorized(err);
            else 
                console.log(err);
        });
    }

    render() {
        if (!this.state.authorizedUser)
            return <Redirect to='/' />

        return (
            <div>
                <h3>New Note</h3>
                <form onSubmit={this.addNote.bind(this)}>
                    <div className="form-control">
                        <textarea placeholder="Enter Note here .." onChange={(e) => this.setState({ note: e.target.value })} value={this.state.note}></textarea>
                    </div>
                    <button className="btn">Add</button>
                </form>
                <hr />
                <h3>My Notes</h3>
                <ul className="list">
                    {this.state.notes.map(note => (
                        <List key={note._id} item={note}>
                            <div>{note.note}</div> 
                            <button className="delete-btn" onClick={this.deleteNote.bind(this, note._id)}><FaRegTimesCircle /></button>
                        </List>
                    ))}


                </ul>
            </div>
        )
    }
}

