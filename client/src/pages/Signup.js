import React, { Component } from "react";
import lstyles from '../localstyles/login.module.css'
import axios from "axios";


class Signup extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            logindata: {
                "user_name": "",
                "user_email": "",
                "user_password": "",
                "cpassword": ""
            }
        }
    }

    updateForm = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let data = this.state.logindata;
        data[nam] = val
        this.setState({ logindata: data });
    }

    signup = (event) => {
        event.preventDefault()
        if (this.state.logindata['user_password'] === this.state.logindata['cpassword']) {
            axios.post("/api/signup", {email: this.state.logindata['user_email']} ,
            {
                auth: {
                    username: this.state.logindata['user_name'],     
                    password: this.state.logindata['user_password']
                }
            })
            .then(res => {
                if (res.data) {
                        this.props.history.push('/');
                }
            })
            .catch(err => {
                if (err.response.status === 309) {
                    window.alert("Account already exists")
                }
            });
        }
        else {
            window.alert("Password doesn't match")
        }
    }

    render() {
        return (
            <section className={`hero is-fullheight ${lstyles.wavebg}`}>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <div className="box">
                                
                                <h3 className="title">Sign Up</h3>
                                <figure className="avatar">
                                    <img width ='64' alt = "logo" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freepnglogos.com%2Fuploads%2Ftelegram-logo-15.png&f=1&nofb=1" />
                                </figure>
                                <br />
                                
                                <form onSubmit={this.signup}>    

                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-normal" onChange={this.updateForm} name="user_name" type="text" placeholder="Username" required autoFocus=""/>
                                        </div>
                                    </div>
                                    
                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-normal" onChange={this.updateForm} name="user_email" type="email" placeholder="Your Email" required autoFocus=""/>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-normal" onChange={this.updateForm} name="user_password" type="password" required placeholder="Your Password"/>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-normal" onChange={this.updateForm} name="cpassword" type="password" required placeholder="Confirm Password"/>
                                        </div>
                                    </div>

                                    <button className="button is-block is-info is-normal is-fullwidth"> Create Account <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                                </form>
                            </div>

                            <p className="has-text-white">
                                <a href="/login">Login</a> &nbsp;-&nbsp;&nbsp;
                                <a href="../">Forgot Password</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Signup;