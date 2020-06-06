import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

class EditTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: false
    }
  }
    
  changeDisplay = () => {
    if (this.state.display == false) {
        this.setState({ display: 'is-active'})    
    }
    else {
        this.setState({ display: false}) 
    }  
  }

  render() {
    return (
        <div className={`dropdown ${this.state.display}`}>
            <div className="dropdown-trigger">
                <FontAwesomeIcon
                    icon={faPenSquare} size="lg" 
                    style={{color: 'rgb(165, 163, 175)'}}
                    onClick = {this.changeDisplay}
                />
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu" onMouseLeave = {() => this.setState({display: false})}>
                <div className="dropdown-content">
                    <a href="#" className="dropdown-item" onClick={() => { this.props.editIt(this.props.index) }}>
                    Update
                    </a>
                    <a href="#" className="dropdown-item" onClick = {() => this.props.deleteIt(this.props.index)}>
                    Delete
                    </a>
                </div>
            </div>
        </div>
    )
  }
}

export default EditTodo;
