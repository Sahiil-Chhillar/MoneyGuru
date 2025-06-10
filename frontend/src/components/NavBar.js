import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BsSendFill } from 'react-icons/bs';
import { sendEmail } from '../utils/renders';
import LoadingBar from 'react-top-loading-bar';
import '../css/navBar.css';

function NavBar(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const ref = useRef(null);
  const userData = props.data;
  const navigate = useNavigate();

  const logoutHandle = () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem('User');
      toast.success("Logout Successfully!!");
      ref.current.complete();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <LoadingBar color="orange" ref={ref} />
      <div className="navbar">
        <div className="navbar-left">
          <p><span>Money</span>Guru</p>
        </div>

        <div className="navbar-right">

          <div className="send-email-wrapper" onClick={() => setIsPressed(!isPressed)}>
            <div className="gradient-background"></div>
            <div className="send-email-btn">Send Email</div>
          </div>

          <div className={`email-input-box ${isPressed ? 'visible' : 'hidden'} -ml-48`}>
            <div className="close-btn" onClick={() => setIsPressed(!isPressed)}>x</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                placeholder="Your Email"
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                className="input-field"
              />
              <button
                onClick={() => sendEmail(userEmail, userData)}
                className="send-btn"
              >
                <BsSendFill />
              </button>
            </div>
            <p className="email-hint">**Get your expenses in <b>one month</b>, On Your Email</p>
          </div>

          <div>
            <a onClick={logoutHandle} className="logout-btn">
              <span className="bg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="fg">Log Out</span>
              <span style={{ visibility: 'hidden' }}>LogOut</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NavBar;