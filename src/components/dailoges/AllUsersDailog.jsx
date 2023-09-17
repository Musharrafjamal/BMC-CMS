import React from "react";
import "./AllUsersDailog.css";

const AllUsersDailog = ({
  closeDailog,
  setFullname,
  setCategory,
  setGender,
  setPhoneNUmber,
  setFatherName,
  submitUser,
  setRefrence,
  setDate,
  setResult,
  setImportant,
}) => {
  return (
    <div className="create-user-container">
      <div className="create-user-card">
        <h1>Create user</h1>
        <div className="create-user-input">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="fatherName">Father's name</label>
          <input
            type="text"
            id="fatherName"
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="mobile">Mobile number</label>
          <input
            type="text"
            id="mobile"
            onChange={(e) => setPhoneNUmber(e.target.value)}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            id="gender"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="refrence">Refrence</label>
          <input
            type="text"
            id="refrence"
            onChange={(e) => setRefrence(e.target.value)}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="result">Result</label>
          <input
            type="text"
            id="result"
            onChange={(e) => setResult(e.target.value)}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="create-user-input">
          <label htmlFor="confirm">Important?</label>
          <input
            type="text"
            id="confirm"
            onChange={(e) => setImportant(e.target.value)}
          />
        </div>
        <div className="create-user-btns">
          <button className="create-user-red-btn" onClick={closeDailog}>
            Cancel
          </button>
          <button className="create-user-green-btn" onClick={submitUser}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsersDailog;
