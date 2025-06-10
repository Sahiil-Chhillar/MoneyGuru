import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';
import '../css/home.css';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount , setAmount] = useState(0);
  const [category , setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp , setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = 'Home';

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
    }

    setUserexp(Promise.resolve(getUserExpenses(userdata._id)).then((data) => setUserexp(data)));
  }, [userdata._id, navigate]);

  const getTotal = () => {
    let sum = 0;
    for (const item in userexp) {
      sum += userexp[item].amount;
    }
    return sum;
  };

  return (
    <div className='home-container'>
      <LoadingBar color='orange' ref={ref} />
      <NavBar data={userexp} />

      <div className='feed-container'>

        <div className='form-section'>
          {/* Create Transaction Form */}
          <div className='create-transaction-box'>
            <div className='create-title'>Create Transaction</div>
            <div className='form-input-group'>
              <input
                type='number'
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
                className='input-amount'
              />
              <select
                id="categories"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue='selected'
                className='select-category'
              >
                <option value="">--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Fun">Fun</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className='form-input-group'>
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectedDate(date)}
                className="date-picker"
                placeholderText="Date"
                showYearDropdown
              />
              <a
                onClick={() => {
                  const expInfo = {
                    usersid: userdata._id,
                    category,
                    date: selectDate,
                    amount
                  };
                  ref.current.staticStart();
                  createExpense(expInfo);
                  ref.current.complete();
                }}
                href="#_"
                className="create-button"
              >
                <span className="btn-shine"></span>
                <span className="relative">+</span>
              </a>
            </div>
          </div>

          {/* Expense List */}
          <div className='transaction-list-container'>
            <div className='total-expense'>Total Expense : ₹ {getTotal()}</div>
            <div className='transaction-grid'>
              {
                Object.keys(userexp).map((item) => (
                  <Items key={userexp[item]._id} data={userexp[item]} />
                ))
              }
            </div>
          </div>
        </div>
        <div className='chart-section'>
          <Chartss exdata={userexp} />
        </div>
      </div>
    </div>
  );
}

export default Home;