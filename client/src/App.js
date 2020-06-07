import React from 'react';
import axios from 'axios';
import ListTodo from './pages/components/ListTodo';
import InputTodo from './pages/components/InputTodo';
import NavBar from './pages/components/NavBar';
import lstyles from './localstyles/login.module.css'
import astyles from './localstyles/app.module.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todoData: [],
      show: ["Active", "Todos"],
      selected: 0,
    }
  }

  fetchTodos = () => {
    axios.get('/api/gettodos', {
    })
      .then(res => {
        if (res.data) {
          this.setState({ todoData: res.data })
        }
        else {
          console.log("Error from server", res)
        }
      })
      .catch(err => { console.log("Axios error") })
  }

  logout = () => {
    if (window.confirm("Do you want to logout?")) {
      axios.get('/api/logout').then(res => this.props.history.push('/login'))
        .catch(err => console.log(err))
    }
  }

  componentDidMount() {
    axios.get('/api/isLogged')
      .then(res => {
        this.fetchTodos()
      }).catch(err => {
        if (err.response.status === 401) {
          this.props.history.push('/login');
        }
      })
  }

  changeWindow = (id) => { 
    let tags = [["Active", "Todos"], ["Important", "Important"], ["Completed", "Archived"]]
    this.setState({show: tags[id], selected: id})
  }
  
  render() {
    return (
      <div className="App" style={{ minHeight: '100vh' }}>
        <NavBar changer={this.changeWindow}  />
        <div className="columns" style={{ height: '100%' }}>

          <div className={`column is-2 ${astyles.sidebar}`} style={{ backgroundColor: 'white', minHeight: '100vh', paddingRight: 0 }}>
            <a style={{fontSize: 'calc(1vh + 0.4vw + 4px)'}} href="#" className={`dropdown-item ${this.state.selected == 0 ? "is-active" : ""}`} onClick = {() => {this.changeWindow(0)}}>
              All todos
            </a>
            <a style={{fontSize: 'calc(1vh + 0.4vw + 4px)'}} href="#" className={`dropdown-item ${this.state.selected == 1 ? "is-active" : ""}`}  onClick = {() => {this.changeWindow(1)}} >
              Important
            </a>
            <a style={{fontSize: 'calc(1vh + 0.4vw + 4px)'}} href="#" className={`dropdown-item ${this.state.selected == 2 ? "is-active" : ""}`}  onClick = {() => {this.changeWindow(2)}} >
              Archived
            </a>
            <a style={{fontSize: 'calc(1vh + 0.4vw + 4px)'}} href="#" onClick = {this.logout} className='dropdown-item' >
              Logout
            </a>
          </div>

          <div className={`column ${lstyles.wavebg} ${astyles.column2}`} style={{ paddingLeft: 0 }}>

            {/* <div style={{backgroundColor: '#7d89ff', height: '10%'}}>
              
              </div> */}

            <div className={`${astyles.subcolumn}`} style={{ backgroundColor: '#fff', padding: 16, borderRadius: 6, margin: '0.75rem', boxShadow: "0px 1px 11px -7px" }} >
              <InputTodo refresh={this.fetchTodos} />
              <br />
              <ListTodo show={this.state.show} todoData={this.state.todoData} refresh={this.fetchTodos} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;