import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [redirectToStudents, setRedirectToStudents] = useState(false);
  const [schedule, setSchedule] = useState(null); // schedule state added here
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const user = {
      username: username,
      password: password
    };
  
    axios.post(`https://api.qrdestek.com/api/token/`, user)
      .then(res => {
        localStorage.setItem('token', res.data.access);
        setToken(res.data.access);
        getStudentSchedule(res.data.access);
        checkUserType(res.data.access, "berkakalin");  
      })
      .catch(error => {
        console.error(error);
      });
  }

  const checkUserType = async (token,username) => {
    try {
      const response = await axios.get(`https://api.qrdestek.com/users/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const userIsAdmin = response.data.is_superuser;
  
      if (!userIsAdmin) {
        navigate('/show-schedule');
      }
      else if (userIsAdmin){
        navigate('/halls');
      }
      else {
        console.error('User type not recognized');
      }
      
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const getStudentSchedule = (token) => {
    axios.get(`https://api.qrdestek.com/users/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setSchedule(res.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  if (redirectToStudents) {
    navigate('/students/index');
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
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
              value={password}
              onChange={handleInputChange}
              className="form-control"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
      {schedule && <pre>{JSON.stringify(schedule, null, 2)}</pre>} 
    </div>
  );
}

export default Login;