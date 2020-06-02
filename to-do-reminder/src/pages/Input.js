import React, { Component } from 'react';
import axios from 'axios';


class Input extends Component {

  state = {
    action: ""
  }

  addTodo = () => {
    const task = {action: this.state.action}
    //console.log("TODO ADD");
    if(task.action && task.action.length > 0)
    {
      //console.log("TODO ADD IF");
      axios.post('/api/todos', task)
        .then(res => {
          if(res.data)
          {
            console.log(res.data);
            this.props.getTodos();
            this.setState({action: ""})
          }
        })
        .catch(err => console.log(err))
    }
    else
     {
      console.log('input field required')
    }
  }

  testit = () => {
    //sample test api to test backend
      axios.get('/api/testapi')
        .then(res => {
          if(res.data)
          {
          	window.alert(res.data);
          }
        })
  }

  handleChange = (e) => {
    this.setState({
      action: e.target.value
    })
  }

  render() {
    let { action } = this.state;
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={action} />
        
        <button onClick={this.addTodo}>add todo</button>

        <button onClick={this.testit}>TEST API</button> {/* FOr Testing*/}
      </div>
    )
  }
}

export default Input