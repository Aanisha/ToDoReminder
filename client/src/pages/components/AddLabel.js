import React from 'react';
import lstyles from '../../localstyles/listtodo.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

class AddLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        display: false,
        text: "",
    }
  }
    
  changeDisplay = () => {
    if (this.state.display === false) {
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
                <span onClick = {this.changeDisplay} style={{cursor: 'pointer'}} className="tag is-info is-light">{this.props.label}</span>
            </div>
            <div className="dropdown-menu" id="dropdown-menu3" role="menu" onMouseLeave = {() => this.setState({display: false})}>
                <div className="dropdown-content">
                    <a href="#" className="dropdown-item" onClick = {() => {this.props.labelIt(this.props.index, 'Important') || this.setState({display: false}) }} >
                        Important
                    </a>
                    <a href="#" className="dropdown-item" onClick = {() => {this.props.labelIt(this.props.index, 'Errand') || this.setState({display: false})}}>
                        Errand
                    </a>
                    <a href="#" className="dropdown-item" onClick = {() => {this.props.labelIt(this.props.index, 'Home') || this.setState({display: false})}}>
                        Home
                    </a> 
                    <div className="dropdown-item" style={{ display: 'flex', alignItems: 'center' }}>
                        <input className="input is-small" onChange={(e) => {this.setState({ text: e.target.value })}} placeholder="Enter label" type="text" />
                        &nbsp;&nbsp;
                        <FontAwesomeIcon onClick={() => { this.props.labelIt(this.props.index, this.state.text) || this.setState({display: false}) }} className={lstyles.clickicons} icon = {faCheckSquare} size='lg' />
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default AddLabel;
