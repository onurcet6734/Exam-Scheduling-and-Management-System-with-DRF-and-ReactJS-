import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [redirectToStudents, setRedirectToStudents] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, []);

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
        checkUserType(res.data.access);  
      })
      .catch(error => {
        console.error(error);
        setUsername('');
        setPassword('');
        NotificationManager.error('Error: Invalid username or password');
      });
  }

  const checkUserType = async (token) => {
    try {
      const response = await axios.get(`https://api.qrdestek.com/users/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Check if response data exists
      if (response.data) {
        const userIsAdmin = response.data[0].is_superuser;
        localStorage.setItem('userIsAdmin', userIsAdmin);
  
        if (userIsAdmin) {
          console.log('User is admin');
          navigate('/halls');
        } else {
          console.log('User is not admin');
          navigate('/show-schedule');
        }
      } else {
        console.error('No data in response');
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
    <>
        <div className="grid justify-items-center ...">
            <div className="shadow-2xl mt-12 border-indigo-600 rounded-lg w-[25%]">
                <div className="m-4">
                    <p className="text-xl text-center py-4 font-medium">Login Page</p>
                    <div className="px-4 my-2">
                        <p className="text-md">Username:</p>
                        <input className="w-full border-2 border-gray-300 p-2 my-2 rounded-md" type="text" name="username" value={username} onChange={handleInputChange} />
                    </div>

                    <div className="px-4  my-2">
                        <p className="text-md">Password:</p>
                        <input className="w-full border-2 border-gray-300 p-2 my-2 rounded-md" type="password" name="password" value={password} onChange={handleInputChange} />
                    </div>

                    <div className="mt-4">
                        <button className="rounded-md bg-sky-500 w-full h-10 text-white" onClick={handleSubmit}>Login</button>
                    </div>

                    <NotificationContainer />
                </div>
            </div>
        </div>
    </>
  );
}

export default Login;