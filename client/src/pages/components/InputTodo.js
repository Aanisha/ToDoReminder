import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddLabel from './AddLabel';

class InputTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: { todo: "", label: "New", status: "Active", due: new Date() }
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
    if (this.state.data.todo != "") {
      axios.post('/api/addtodo', this.state.data)
      .then(res => {
        this.props.refresh()
        this.setState({
          data: { todo: "", label: "New", status: "Active", due: new Date() }
        })
      })
      .catch(err => console.log(err))
    }
    else {
      window.alert("Todo field is empty")
    }
   
  }


  setDueDate = (date) => {
    let data = this.state.data
    data.due = date
    this.setState({ data: data })
  }

  editLabel = (index, text) => {
    let data = this.state.data
    data.label = text
    this.setState({ data: data })
  }

  render() {
    return (
      <form className="todo-list" style={{display: 'flex'}}>
        <input className="input is-normal" type="text" onChange={(e) => this.updateText(e.target.value)} value={this.state.data.todo} placeholder="Enter todo" />
        &nbsp;
        <AddLabel label={this.state.data.label} labelIt={this.editLabel} index={-1} />
        &nbsp;
        <DatePicker
          selected={this.state.data.due}
          onChange={date => this.setDueDate(date)}
          timeInputLabel="Time:"
          dateFormat="dd/MM/yyyy h:mm aa"
          className="input is-normal"
          title="Set task due"
          showTimeInput
        /> &nbsp;
        <input className="button is-block is-info is-normal" onClick={this.createTodo} type="button" value="Add Todo" />
      </form>
    )
  }
}

export default InputTodo;
