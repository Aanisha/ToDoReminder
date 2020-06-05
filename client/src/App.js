import React from 'react';
import axios from 'axios';
import ListTodo from './pages/components/ListTodo';
import InputTodo from './pages/components/InputTodo';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoData: [],
    }
  }

  componentWillMount() {
    this.fetchTodos()
  }

  fetchTodos = () => {
    axios.get('/api/gettodos', {
      params: {
        user: "Sample2"
      }
    })
      .then(res => {
        if (res.data) {
          this.setState({ todoData: res.data })
          console.log(res.data)
        }
        else {
          console.log("Error from server", res)
        }
      })
      .catch(err => { console.log("Axios error") })
  }

  componentDidMount() {
    //this.props.history.push('/login');
    axios.get('/api/isLogged')
      .then(res => {

      }).catch(err => {
        if (err.response.status === 401) {
          this.props.history.push('/login');
        }
      })
  }

  render() {
    return (
      <div className="App">
        
        <InputTodo refresh = {this.fetchTodos} />
        <ListTodo todoData={this.state.todoData} refresh = {this.fetchTodos} />
      </div>
    );
  }
}

export default App;