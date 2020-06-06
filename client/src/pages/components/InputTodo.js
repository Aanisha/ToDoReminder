import React from 'react';
import axios from 'axios';

class InputTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: { todo: "", label: "new", status: "pending", due: "" }
    }
  }

  updateText = (text) => {
    let data = this.state.data
    data.todo = text
    this.setState({
      data: data
    })
  }

  createTodo = () => {
    axios.post('/api/addtodo', this.state.data)
      .then(res => {
        this.props.refresh()
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="todo-list" style={{display: 'flex'}}>
        <input className="input is-small" type="text" onChange={(e) => this.updateText(e.target.value)} value={this.state.data.todo} placeholder="Enter todo" />
        &nbsp;
        <input className="button is-block is-info is-small" onClick={this.createTodo} type="button" value="Add" />
      </div>
    )
  }
}

export default InputTodo;
