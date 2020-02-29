import React, { Component } from 'react';
import axios from 'axios';
import List from './partials/List';

export default class Notes extends Component {
    constructor(props){
        super(props);
        this.state = {
            readId: props.match.params.readId,
            notes: [],
            note: ''
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/sessions/${this.state.readId}/notes`, 
        {
            headers: { authorization: localStorage.getItem('token') }  
        }).then(response => {
            console.log(response.data);
            this.setState({notes: response.data});
        });
    }

    addNote(e){
        e.preventDefault();
        axios.post(`http://localhost:3000/sessions/${this.state.readId}/notes`, {
           note: this.state.note,
        }, {
            headers: { authorization: localStorage.getItem('token') }  
        }).then(response => {
            console.log(response);
            if(response.status == 200){
                this.state = {
                    note: '',
                };
            }
        });
    }

    render() {
        return (
            <div>
                <h3>New Note</h3>
                <form onSubmit={this.addNote.bind(this)}>
                    <div className="form-control">
                        <textarea  placeholder="Enter Note here .."  onChange={(e) => this.setState({note: e.target.value })} value={this.state.note}></textarea>
                    </div>
                    <button className="btn">Add</button>
                </form>
                <hr/>
                <h3>My Notes</h3>
                <ul className="list">
                    {this.state.notes.map(note => (
                        <List item={note}>
                            {note.note}
                        </List>
                    ))}
                    
                    
                </ul>
            </div>
        )
    }
}

