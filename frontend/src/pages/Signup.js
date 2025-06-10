import React, { useEffect, useState } from 'react'
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';
import '../css/signup.css';
import signUpImg from '../Animation/login_img.png';

function Signup() {
  document.title = 'SignUp'
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email , setEmail] = useState("");
  const ref = useRef(null);

  // pervent login again
  useEffect(()=>{
    if(localStorage.getItem("User"))
    {
      navigate("/");
    }
  },[navigate]);

  const submitForm =async (e)=>{
    e.preventDefault();
    try {
      ref.current.staticStart();
      await axiosClient.post('/auth/signup',{
        username,
       email,
       password
      });
      // console.log(response.data.message);
      toast.success("Registerd Successfully!!")
      ref.current.complete();
      navigate("/login");

    } catch (error) {
      console.log(error.message)
    }
  }



  return (
    <div className="signup-container">
      <LoadingBar color='orange' ref={ref} />

      <div className="signup-left">
        <h1 className="signup-title">
          <span className="signup-title-highlight">Money</span>Guru
        </h1>
        <img
          src= {signUpImg}
          alt='Login Illustration'
          className='login-image'
        />
      </div>

      {/* <hr className="signup-divider" /> */}

      <div className="signup-right">
        <div className="signup-box">
          <h1 className="signup-heading">SignUp</h1>
          <input
            placeholder="UserName"
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
          />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <button onClick={submitForm} className="signup-button">Submit</button>
          <p className="signup-footer">
            Already Registered? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup