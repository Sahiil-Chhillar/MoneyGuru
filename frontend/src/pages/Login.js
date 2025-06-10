import React, { useEffect, useState , useRef} from 'react'
import {axiosClient} from '../utils/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import '../css/login.css';
import loginImg from '../Animation/login_img.png';
document.title = 'Login'
function Login() {
  const navigate = useNavigate();
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState(""); 
  // const [userdata , setUserdata] = useState({});
  const ref = useRef(null);
  
  // pervent login again
  useEffect (()=>{
    if(localStorage.getItem("User"))
    {
      navigate("/");
    }
  },[navigate]);


  const submitForm =async (e)=>{
      e.preventDefault();
      try {
        ref.current.staticStart();
        const response = await axiosClient.post('/auth/login',{
         email,
         password
        });
        // console.log(response.data);
        if(response.data.statusCode !== 201)
        {
          toast.error(response.data.message);
          return;
        }
        toast.success("Successfully Logged In !!")
        // setUserdata(response.data.message);
        localStorage.setItem('User',JSON.stringify(response.data.message));
        ref.current.complete();
        
        navigate('/');

      } catch (error) {
        console.log(error.message)
      }
  }

  return (
    <div className='login-container'>
      <LoadingBar color='orange' ref={ref} />
      <div className='login-left'>
        <h1 className='login-title'>
          <span className='login-title-highlight'>Money</span>Guru
        </h1>
        <img
            src= {loginImg}
            alt='Login Illustration'
            className='login-image'
          />
      </div>

      {/* <hr className='login-divider' /> */}

      <div className='login-right'>
        <div className='login-box'>
          <h1 className='login-heading'>Login</h1>
          <input
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className='login-input'
          />
          <input
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='login-input'
          />
          <button onClick={submitForm} className='login-button'>Submit</button>
          <p className='login-footer'>
            New User? Go To <a href='/signup'>SignUp</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login