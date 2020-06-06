import React from 'react';
import lstyles from '../../localstyles/listtodo.module.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faCheck, faTrash, faTrashAlt, faTimes, faWindowClose, faCheckSquare, faClock, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import AddLabel from './AddLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ListTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isedit: -1,
      dateEdit: -1,
      date: new Date()
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.todoData
    })
  }

  editTodo = (index) => {
    this.setState({
      isedit: index
    })
  }

  //updates the todo in state
  updateTodo = (text, index) => {
    let data = this.state.data
    data[index].todo = text
    this.setState({
      data: data
    })
  }

  deleteTodo = (index) => {
    axios.delete('/api/deletetodo', {
      headers: {
        Authorization: 'authorizationToken'
      },
      data: {
        "ids": [this.state.data[index]._id]
      }
    }).then(res => {
      this.props.refresh()
    }).catch(err => console.log(err))
  }

  //updates the todo in database
  saveTodo = (index) => {
    axios.put('/api/updatetodo', this.state.data[index]).then(res => {
      this.setState({
        isedit: -1
      })
      this.props.refresh()
    }).catch(err => {
      console.log(err)
    })
  }

  editLabel = (index, text) => {
    let data = this.state.data
    data[index].label = text
    this.setState({ data: data })
    axios.put('/api/updatetodo', this.state.data[index]).then(res => {
      this.props.refresh()
    }).catch(err => {
      console.log(err)
    })
  }

  changeStatus = (index) => {
    let data = this.state.data
    let status = data[index].status
    if (status === 'Active') {
      data[index].status = 'Completed'
      this.setState({ data: data })
      axios.put('/api/updatetodo', this.state.data[index]).then(res => {
        this.props.refresh()
      }).catch(err => {
        window.alert("Error occured")
      })
    }
    else if (this.status === 'Expired') {
      data[index].status = 'Active'
      this.setState({ data: data })
      axios.put('/api/updatetodo', this.state.data[index]).then(res => {
        this.props.refresh()
      }).catch(err => {
        window.alert("Error occured")
      })
    }
    else {
      data[index].status = 'Active'
      this.setState({ data: data })
      axios.put('/api/updatetodo', this.state.data[index]).then(res => {
        this.props.refresh()
      }).catch(err => {
        window.alert("Error occured")
      })
    }
  }


  setDueDate = (date, index) => {
    let data = this.state.data
    data[index].due = date
    this.setState({ data: data })
  }

  saveDate = (index) => {
    axios.put('/api/updatetodo', this.state.data[index]).then(res => {
      this.props.refresh()
      this.setState({
        dateEdit: -1
      })
    }).catch(err => {
      console.log(err)
    })
  }

  timeConvert = (time) => {
    let dates = new Date(time)
    let times = dates.toLocaleString(undefined, {
      month: "short", day: "numeric",
      hour: "numeric", minute: "numeric"
    })
    return times
  }


  render() {
    let todos = this.state.data
    return (
      <div className="todo-list">
        <h1 className="title"> Todo List </h1>

        <div>
          {
            todos &&
              todos.length > 0 ?
              (
                todos.map((todo, index) => {
                  return (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8 }} >

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon
                          style={todo.status === 'Completed' ? { color: '#4ed04e' } : (todo.status === 'expired' ? { color: 'red' } : { color: '#cd5c5c' })}
                          title={todo.status === 'Completed' ? "Completed" : (todo.status === 'expired' ? "Expired" : "Active")}
                          onClick={() => this.changeStatus(index)}
                          icon={todo.status === 'Completed' ? faCheckCircle : (todo.status === 'expired' ? faTimesCircle : farCircle)} size="lg"
                        />
                        &nbsp;&nbsp;
                        <div className="display" style={{ display: 'flex' }}>
                          {
                            this.state.isedit !== index ?
                              <h3
                                onClick={() => this.editTodo(index)}
                                className="subtitle is-5"
                                style={{ margin: 0 }}
                              >
                                {todo.todo}
                              </h3>
                              :
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input style={{ cursor: 'pointer' }} onChange={(e) => { this.updateTodo(e.target.value, index) }} value={todo.todo} class="input is-small" placeholder="Enter todo" />
                                &nbsp;
                                <FontAwesomeIcon className={lstyles.clickicons} onClick={() => { this.saveTodo(index) }} icon={faCheckSquare} style={{fontSize: '1.9rem'}} />
                              </div>

                          }
                          &nbsp;&nbsp;
                          <AddLabel label={todo.label} labelIt={this.editLabel} index={index} />

                        </div>
                      </div>

                      <div className="operations" style={{ display: 'flex' }}>
                        {this.state.dateEdit !== index ?
                          <div style={{display: 'flex', alignItems: 'center'}}>
                             <FontAwesomeIcon   
                              icon={faClock}
                              size="xm"
                              className={lstyles.clickiconw} 
                              onClick={() => window.alert()}
                              title={`Due on ${new Date(todo.due).toLocaleString()}`}
                            />
                            &nbsp;
                              <h3 onClick={() => this.setState({ dateEdit: index })} >{this.timeConvert(todo.due)}</h3>
                            </div>
                          :
                          (
                            <div className="display" style={{ display: 'flex' }}>
                              <DatePicker
                                selected={new Date(todo.due)}
                                onChange={date => this.setDueDate(date, index)}
                                timeInputLabel="Time:"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                className="input is-small"
                                showTimeInput
                              />
                              &nbsp;
                               <FontAwesomeIcon   
                                icon={faCheckSquare}
                                style={{fontSize: '1.9rem'}}
                                className={lstyles.clickiconw} 
                                onClick = {() => this.saveDate(index)}
                              />
                            </div>
                          )
                        }
                        &nbsp;&nbsp;&nbsp;&nbsp;
                          <FontAwesomeIcon
                            className={lstyles.clickicons}
                            icon={faTrashAlt} size="lg"
                            onClick={() => this.deleteTodo(index)}
                          />
                      </div>
                    </div>
                  )
                })
              )
              :
              (
                <h3>There are no todo(s). Create a new todo</h3>
              )
          }
        </div>
      </div>
    )
  }
}
export default ListTodo;
