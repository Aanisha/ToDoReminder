import React from 'react';
import 'bulma/css/bulma.css';
import axios from "axios";

class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      weather: "Sunny, 30&#176 C",
      wind:"6.4 km/u, SW",
      noOfCompletedTask:5,
      noOfRemainingTask: 5,
      departTime: "8:50",
      isUserLoggedIn:true,
      username: "Mehul"
    }
  }


  render(){
    return(
      <div className="wrapper">
    		<div className="background">

          <div className="welcome">
            <h1> Welcome {this.state.username}</h1>
          </div>

    			<div className="widget">
    				<div className="leftside">
    						<div className="time">
    							<div className="time-cont"></div>
    							<div className="date"></div>
    						</div>
    						<div className="settings-cont">

    						</div>
    				</div>
    				<div className="rightside">
    						<ul className="infos">
    							<li><i className="sun"></i><span>{this.state.weather}</span></li>
    							<li><i className="wind"></i><span>{this.state.wind}</span></li>
    							<li><span className="spacer"></span></li>
    							<li><i className="tasks"></i><span>{this.state.noOfCompletedTask} tasks</span></li>
    							<li><i className="bus"></i><span>Departs at {this.state.departTime}</span></li>
    						</ul>  
    					</div>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;