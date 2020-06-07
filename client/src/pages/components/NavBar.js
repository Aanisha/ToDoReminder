import React from 'react';
import astyles from '../../localstyles/app.module.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            burger: ""
        }
    }

    toggle = () => {
        if (this.state.burger === "") {
            this.setState({ burger: "is-active" })
        }
        else {
            this.setState({ burger: "" })
        }
    }

    render() {
        return (
            <nav class="navbar" style={{ boxShadow: "-3px -6px 10px 2px" }} role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="https://res.cloudinary.com/azizcloud/image/upload/v1591544372/jpcta3ch68kuid3wiwit.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" />
                    </a>

                    <a role="button" class={`navbar-burger burger ${this.state.burger}`} onClick={this.toggle} aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={`navbar-menu ${this.state.burger} ${astyles.navitems}`}>
                    <div className="navbar-end" style={{ fontWeight: 'bold' }} >
                        <a className="navbar-item" onClick={() => this.props.changer(0) || this.toggle()} > All todos </a>
                        <a className="navbar-item" onClick={() => this.props.changer(1) || this.toggle()} > Important </a>
                        <a className="navbar-item" onClick={() => this.props.changer(2) || this.toggle()} > Archived </a>
                        <a className="navbar-item"  > Logout </a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar;
