import React from 'react';
import axios from 'axios';
import Todo from './pages/Todo';
import Home from './pages/Home';

class App extends React.Component{
  
  componentDidMount() {
    //this.props.history.push('/login');
    axios.get('/api/isLogged')
     .then(res => {
  
     }).catch( err => {
         if(err.response.status === 401){
          this.props.history.push('/login');
         } 
     })   
  }

  render() {
    return (
      <div className="App">
        <Home />
        <Todo />
      </div>
    );
  }
}

export default App;