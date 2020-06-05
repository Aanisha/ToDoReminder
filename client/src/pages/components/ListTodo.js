import React from 'react';
import lstyles from '../../localstyles/listtodo.module.css'
import axios from 'axios';


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
    console.log("update")
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
      console.log(res)
      this.props.refresh()
    }).catch(err => console.log(err))
  }

  //updates the todo in database
  saveTodo = (index) => {
    axios.put('/api/updatetodo', this.state.data[index]).then( res => {
      console.log(res)
      this.setState({
        isedit: -1
      })
      this.props.refresh()
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    let todos = this.state.data
    return (
      <div className="todo-list">
        <h1> Todo List </h1>
        <ul>
          {
            todos &&
              todos.length > 0 ?
              (
                todos.map((todo, index) => {
                  return (
                    <div key={index} style={{display: 'flex'}} >
                      <div className="display" style={{display: 'flex'}}>
                        {
                          this.state.isedit !== index ? <h3> {todo.todo} </h3> : <input onChange={(e) => {this.updateTodo(e.target.value, index)}} type="text" value = {todo.todo}/>
                        }
                        <h3> - {todo.status} </h3> 
                        <h3> - {todo.label} </h3> 
                      </div>

                      <div className="operations">
                        <input type="checkbox"/>
                        <input onClick={() => { this.deleteTodo(index) }} type="button" value="delete"/>
                        {
                          this.state.isedit !== index ? <input onClick={() => { this.editTodo(index) }} type="button" value="update" />
                          :<input onClick={() => { this.saveTodo(index) }} type="button" value="Save" />
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
        </ul>
      </div>
    )
  }
}
export default ListTodo;
