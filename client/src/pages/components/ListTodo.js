import React from 'react';
import lstyles from '../../localstyles/listtodo.module.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faTrashAlt, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import AddLabel from './AddLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchResults from 'react-filter-search';

class ListTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isedit: -1,
      dateEdit: -1,
      date: new Date(),
      showActive: false,
      searchString: ""
    }
    this.oldDate = ""
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.todoData
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ date: Date.now() }), 30000);
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
    return (
      <div className="todo-list">
        <input className="input is-normal" onChange={(e) => this.setState({ searchString: e.target.value })} type="text" placeholder="Search Todo" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 8 }}>
          <h1 style={{ fontSize: 'calc(1.2vh + 0.6vw + 12px)', fontWeight: 'bold' }}> {this.props.show[1]} </h1>
          {
            this.props.show[1] !== "Archived" ?
              <label class="checkbox">
                <input type="checkbox" onClick={() => { this.setState({ showActive: !this.state.showActive }) }} checked={this.state.showActive} />
                &nbsp; Show only active todos
            </label>
              : <p></p>
          }
        </div>
        <div>
          <SearchResults
            value={this.state.searchString}
            data={this.state.data}
            renderResults={results => (
              <div>
                {results[0] !== undefined ?
                  results.map((todo, index) => {
                    this.oldDate = new Date(todo.due) < (new Date() - 20000)
                    if (
                      (this.state.showActive && todo.status === "Active" && !this.oldDate && this.props.show[1] !== "Archived" && this.props.show[1] === "Todos")
                      ||
                      (!this.state.showActive && this.props.show[1] !== "Archived" && this.props.show[1] === "Todos")
                      || (this.props.show[1] === "Archived" && (todo.status != "Active" || this.oldDate))
                      || (!this.state.showActive && this.props.show[1] === "Important" && todo.label === "Important")
                      || (this.state.showActive && this.props.show[1] === "Important" && todo.label === "Important" && todo.status === "Active" && !this.oldDate)
                    ) {
                      return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8, borderBottom: '1px solid #e1cfcf' }} >

                          <div style={{ display: 'flex', alignItems: 'center', maxWidth: '84%' }}>
                            <FontAwesomeIcon
                              style={todo.status === 'Completed' ? { color: '#4ed04e' } : (todo.status === 'Overdue' ? { color: 'red' } : { color: '#cd5c5c' })}
                              title={todo.status === 'Completed' ? "Completed" : (this.oldDate ? "Overdue" : "Active")}
                              onClick={() => this.changeStatus(index)}
                              icon={todo.status === 'Completed' ? faCheckCircle : (this.oldDate ? faTimesCircle : farCircle)} size="lg"
                            />
                        &nbsp;&nbsp;
                        <div className="display" style={{ display: 'flex' }}>
                              {
                                this.state.isedit !== index ?
                                  <p
                                    onClick={() => this.editTodo(index)}
                                    className="subtitle"
                                    style={{ margin: 0, fontSize: 'calc(1vh + 0.4vw + 6px)' }}
                                    title="Click to edit"
                                  >
                                    {todo.todo}
                                  </p>
                                  :
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input style={{ cursor: 'pointer' }} onChange={(e) => { this.updateTodo(e.target.value, index) }} value={todo.todo} className="input is-small" placeholder="Enter todo" />
                                &nbsp;
                                <FontAwesomeIcon className={lstyles.clickicons} onClick={() => { this.saveTodo(index) }} icon={faCheckSquare} style={{ fontSize: '1.9rem' }} />
                                  </div>

                              }
                          &nbsp;&nbsp;
                          <AddLabel label={todo.label} labelIt={this.editLabel} index={index} />

                            </div>
                          </div>

                          <div className="operations" style={{ display: 'flex' }}>
                            {this.state.dateEdit !== index ?
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon
                                  icon={faClock}
                                  size="sm"
                                  className={lstyles.clickiconw}
                                  title={`Due on ${new Date(todo.due).toLocaleString()}`}
                                />
                            &nbsp;
                              <p title="Click to edit" style={{ fontSize: 'calc(1vh + 0.4vw + 1px)' }} onClick={() => this.setState({ dateEdit: index })} >{this.timeConvert(todo.due)}</p>
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
                                    style={{ fontSize: '1.9rem' }}
                                    className={lstyles.clickicons}
                                    title="save"
                                    onClick={() => this.saveDate(index)}
                                  />
                                </div>
                              )
                            }
                        &nbsp;&nbsp;&nbsp;&nbsp;
                          <FontAwesomeIcon
                              title="Delete"
                              className={lstyles.clickiconw}
                              icon={faTrashAlt} size="lg"
                              onClick={() => this.deleteTodo(index)}
                            />
                          </div>
                        </div>
                      )
                    }
                  }
                  ) :
                  <h3> No todo(s) found. </h3>
                }
              </div>
            )
            }
          />
        </div>
      </div>
    )
  }
}
export default ListTodo;
