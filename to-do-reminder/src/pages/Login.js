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
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="column is-4 is-offset-4">
                            <div class="box">
                                
                                <h3 class="title">Login</h3>
                                <figure class="avatar">
                                    <img width ='64' src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freepnglogos.com%2Fuploads%2Ftelegram-logo-15.png&f=1&nofb=1" />
                                </figure>
                                <br/>
                                <form>
                                    
                                    
                                    <div class="field">
                                        <div class="control">
                                            <input class="input is-medium" type="email" placeholder="Your Email" autofocus=""/>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <div class="control">
                                            <input class="input is-medium" type="password" placeholder="Your Password"/>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="checkbox">
                                        <input type="checkbox"/>
                                        &nbsp;Remember me
                                        </label>
                                    </div>
                                    <button class="button is-block is-info is-medium is-fullwidth">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                                </form>
                            </div>
                            <p class="has-text-grey">
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