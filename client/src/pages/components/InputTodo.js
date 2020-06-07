import React from 'react';
import axios from 'axios';

class InputTodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: { todo: "", label: "New", status: "Active", due: "" }
    }
  }

  /*updateText = (text) => {
    let data = this.state.data
    data.todo = text
    this.setState({
      data: data
    })
  }*/

  updateForm = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let data = this.state.data;
        data[nam] = val;
        this.setState({ data: data });
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

        <form onSubmit={this.createTodo}>    

                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-normal"  onChange={this.updateForm} name="todo" type="text" placeholder="Enter Todo" required autoFocus=""/>
                                        </div>
                                    </div>
                                    
                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-normal"  onChange={this.updateForm} name="due" type="date" placeholder="Date" required autoFocus=""/>
                                        </div>
                                         
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            
                                        <label for="label">Choose a label:</label>

                                                  <select name="label" id="label" onChange={this.updateForm}>
                                                      <option value="Personal">Personal</option>
                                                      <option value="Work">Work</option>
                                                      <option value="Shopping">Shopping</option>
                                                      <option value="Others">Others</option>
                                                  </select> 
                                        </div>
                                    </div>

                                    
                                    <input className="button is-block is-info is-small" onClick={this.createTodo} type="button" value="Add" />
                                </form>

       
      </div>
    )
  }
}

export default InputTodo;
