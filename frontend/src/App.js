import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


class Login extends React.Component {
  state = {
    username: '',
    password: '',
    token: null,  // State for the token
    schedule: null,  // State for the schedule data
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  
    const user = {
      username: this.state.username,
      password: this.state.password
    };
  
    axios.post(`http://localhost:8000/api/token/`, user)
      .then(res => {
        if (res.status === 200) {  // Check if the status code is 200
          this.setState({ token: res.data.access });  // Save the token in the state
          this.getStudentSchedule();  // Call the new method
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getStudentSchedule = () => {
    axios.get(`http://localhost:8000/api/scheduling/show-student-schedule/`, {
      headers: {
        Authorization: `Bearer ${this.state.token}`  // Use the token from the state
      }
    })
    .then(res => {
      this.setState({ schedule: res.data });  // Save the schedule data in the state
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control"
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Log in</button>
        </form>
        {this.state.schedule && <pre>{JSON.stringify(this.state.schedule, null, 2)}</pre>} 
      </div>
    );
  }
}

export default Login;