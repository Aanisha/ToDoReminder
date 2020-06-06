import React from 'react';
import lstyles from '../../localstyles/listtodo.module.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import EditTodo from './EditTodo';

class ListTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isedit: -1
    }
  }

  componentWillReceiveProps(props) { //this is called to before render method
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
	      "ids" :  [this.state.data[index]._id]
      }
    }).then(res => {
      this.props.refresh()
    }).catch(err => console.log(err))
  }

  //updates the todo in database
  saveTodo = (index) => {
    axios.put('/api/updatetodo', this.state.data[index]).then( res => {
      this.setState({
        isedit: -1
      })
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
      axios.put('/api/updatetodo', this.state.data[index]).then( res => {
        this.props.refresh()
      }).catch(err => {
        window.alert("Error occured")
      })
    }
    else if (this.status === 'Expired') {
      data[index].status = 'Active'
      this.setState({ data: data })
      axios.put('/api/updatetodo', this.state.data[index]).then( res => {
        this.props.refresh()
      }).catch(err => {
        window.alert("Error occured")
      })
    }
    else {
      data[index].status = 'Active'
      this.setState({ data: data })
      axios.put('/api/updatetodo', this.state.data[index]).then( res => {
        this.props.refresh()
      }).catch(err => {
        window.alert("Error occured")
      })
    }
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
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                      
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <FontAwesomeIcon
                          style={todo.status === 'Completed' ? { color: 'green' } : (todo.status === 'expired' ? { color: 'red' } : { color: 'blue' })}
                          onClick={() => this.changeStatus(index)}
                          icon={todo.status === 'Completed' ? faCheckCircle : (todo.status === 'expired' ? faTimesCircle : farCircle)} size="1x"
                        />
                        &nbsp;
                        <div className="display" style={{display: 'flex'}}>
                          {
                            this.state.isedit !== index ? <h3> {todo.todo} </h3> : <input className="input is-small" onChange={(e) => {this.updateTodo(e.target.value, index)}} type="text" value = {todo.todo}/>
                          }
                          <h3> - {todo.label} </h3> 
                        </div>
                      </div>

                      <div className="operations">
                        {
                          this.state.isedit === index ? <input onClick={() => { this.saveTodo(index) }} type="button" value="Save" /> : <EditTodo deleteIt={this.deleteTodo} editIt={this.editTodo} index={index} />
                        }
                      </div>
                    </div>
                  )
                })
              )
              :
              (
                <li>No todo(s) left</li>
              )
          }
        </div>
      </div>
    )
  }
}
export default ListTodo;
