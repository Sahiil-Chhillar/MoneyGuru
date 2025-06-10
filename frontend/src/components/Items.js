import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { deleteExpense } from '../utils/renders'
import '../css/items.css'

function Items(props) {
  const exp = props.data;

  function getDate() {
    let dater = new Date(Date.parse(exp.date));
    let txt = dater.toString();
    let date = txt.substring(8, 10) + " " + txt.substring(4, 7);
    return date;
  }

  return (
    <div className="items-container">
      <div className="items-header">
        <p className="items-amount">₹ {exp.amount}</p>
        <p className="items-date">{getDate()}</p>
      </div>

      <div className="items-bottom">
        <div className="items-category">
          <p>{exp.category}</p>
        </div>

        <a
          onClick={() => {
            let datar = {
              expenseId: exp._id,
              userId: exp.usersid,
            };
            deleteExpense(datar);
          }}
          href="#_"
          className="items-delete"
        >
          <span className="items-delete-bg"></span>
          <span className="items-delete-icon"><AiFillDelete /></span>
        </a>
      </div>
    </div>
  )
}

export default Items