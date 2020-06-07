import React from 'react';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav class="navbar" style={{boxShadow: "-3px -6px 10px 2px"}} role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" />
                    </a>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
            </nav>
        )
    }
}

export default NavBar;
