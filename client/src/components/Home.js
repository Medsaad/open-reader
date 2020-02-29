import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            newEmail: '',
            newPassword: '',
            authorizedUser: localStorage.getItem('token') ? true : false
        };
    }

    login(e) {
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:3000/users/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.setState({authorizedUser: true});
        });
    }

    signup(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/users/signup', {
            email: this.state.newEmail,
            password: this.state.newPassword
        }).then(response => {
            console.log(response);
        });
    }

    render() {
        if(!this.state.authorizedUser){
            return (
                <div>
                    <form onSubmit={this.login.bind(this)} className="userLogin">
                        <h3>Login</h3>
                        <div className="form-control">
                            <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                        </div>
                        <div className="form-control">
                            <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                        <button className="btn">Login</button>
                    </form>
    
                    <form onSubmit={this.signup.bind(this)} className="userSignup">
                        <h3>Sign up</h3>
                        <div className="form-control">
                            <input type="text" placeholder="Email" value={this.state.newEmail} onChange={(e) => this.setState({ newEmail: e.target.value })} />
                        </div>
                        <div className="form-control">
                            <input type="password" placeholder="Password" value={this.state.newPassword} onChange={(e) => this.setState({ newPassword: e.target.value })} />
                        </div>
                        <button className="btn">Sign up</button>
                    </form>
                </div>
            );
        }else{
            return <Redirect to="/books"/>;
        }
        
    }
}
