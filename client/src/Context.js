import React, { Component } from 'react';
import axios from 'axios';

const ReaderData = React.createContext();

class ReaderProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: []
        };
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
            <ReaderData.Provider value={{ ...this.state }}>
                { this.props.children }
            </ReaderData.Provider>
        )
    }
}

const ReaderConsumer = ReaderData.Consumer;

export{ReaderData, ReaderProvider, ReaderConsumer}
