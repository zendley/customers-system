import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './loginadmin.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from "../../Api/Axios";
import * as axiosUrls from '../../Api/AxiosUrls'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginAdmin() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(axiosUrls.AdminLogin, {
        email: email,
        password: password
      });

      if (response.data.success) {
        // Handle successful login, for example, store the token and navigate
        localStorage.setItem('custoken', response.data.token);
        toast.success("Successfully Logged In", {
          autoClose: 1000, // 5 seconds
        });
        window.location.href = '/dashboard';

      } else {
        // Handle login failure
        toast.error("Error Logging In", {
          autoClose: 1000, // 5 seconds
        });
      }
    } catch (error) {
      // Handle error
      toast.error("Error Logging In", {
        autoClose: 1000, // 5 seconds
      });
    }
  };

  return (
    <div className="containerr">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-gradient text-center">
            <FontAwesomeIcon className='text-gradient' icon={faUserCircle} style={{ fontSize: "110px" }} />
          </h4>
          <h6 className='text-dark w-100 text-center m-0 fw-bolder py-1'>Admin Login</h6>

          {/* <div className="image"></div> */}
        </div>
        <div className="body-form">
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {/* <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text h-100 w-100 rounded-0">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <input
                type="text"
                className="form-control fields"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div> */}
            {/* <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text h-100 w-100 rounded-0">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
              <input
                type="password"
                className="form-control fields"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div> */}
            <div className="input-wrapper w-100">
              <input
                className='w-100'
                type='text'
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <span className='placeholder'>
                Email
              </span>
            </div>
            <br></br>
            <div className="input-wrapper">
              <input
                className='w-100'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='placeholder'>
                Password
              </span>
            </div>
            <br></br>
            <button type="submit" className="btn btn-primary btn-block w-100">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}
