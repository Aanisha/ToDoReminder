import React, { Component } from "react";
import axios from "axios";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-4 is-offset-4">
                            <div className="box">
                                
                                <h3 className="title">Login</h3>
                                <figure className="avatar">
                                    <img width ='64' src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freepnglogos.com%2Fuploads%2Ftelegram-logo-15.png&f=1&nofb=1" />
                                </figure>
                                <br/>
                                <form>
                                    
                                    
                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-medium" type="email" placeholder="Your Email" autofocus=""/>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-medium" type="password" placeholder="Your Password"/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="checkbox">
                                        <input type="checkbox"/>
                                        &nbsp;Remember me
                                        </label>
                                    </div>
                                    <button className="button is-block is-info is-medium is-fullwidth">Login <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                                </form>
                            </div>
                            <p className="has-text-grey">
                                <a href="../">Sign Up</a> &nbsp;-&nbsp;&nbsp;
                                <a href="../">Forgot Password</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;