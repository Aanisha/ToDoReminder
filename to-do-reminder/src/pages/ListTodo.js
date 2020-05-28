import React from 'react';

const ListTodo = ({ todos, deleteTodo }) => {

  return (
    <ul>
      {
        todos &&
          todos.length > 0 ?
            (
              todos.map(todo => {
                return (
                  <li key={todo._id} >{todo.action} <button id="delete" onClick={() => deleteTodo(todo._id)}>Delete</button></li>

                )
              })
            )
            :
            (
              <li>No todo(s) left</li>
            )
      }
    </ul>
  )
}

export default ListTodo;