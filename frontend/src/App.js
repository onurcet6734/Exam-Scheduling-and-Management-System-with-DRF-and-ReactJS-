import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


class Login extends React.Component {
  state = {
    username: '',
    password: '',
    token: null,  
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
        this.setState({ token: res.data.access });  
        this.getStudentSchedule(res.data.access);
        this.checkUserType(res.data.access);  
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  checkUserType = async (token) => {
    try {
        const response = await axios.get('http://localhost:8000/users/3/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const userIsAdmin = response.data.is_superuser;

        if (userIsAdmin) {
            console.log("Admin");
        } else {
            console.log("Normal user");
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
  };

  getStudentSchedule = (token) => {
    axios.get(`http://localhost:8000/api/scheduling/show-student-schedule/`, {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    })
    .then(res => {
      this.setState({ schedule: res.data }); 
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