import React from "react";
import "./AllUsersDailog.css";

const AllUsersDailog = ({
  closeDailog,
  setFullname,
  setAge,
  setGender,
  setPhoneNUmber,
  setEmail,
  submitUser,
}) => {
  return (
    <div className="all-user-dailog">
      <form className="all-user-form" onSubmit={(e) => {e.preventDefault()}}>
        <span className="title">Create new user</span>
        <div className="all-user-inputs">
          <div className="create-user-col-1">
            <label htmlFor="fullname" className="label">
              Full name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required=""
              className="input"
              onChange={(e) => {setFullname(e.target.value)}}
            />
            <label htmlFor="gender" className="label">
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="gender"
              required=""
              className="input"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="age" className="label">
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              required=""
              className="input"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="create-user-col-2">
            <label htmlFor="phone" className="label">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required=""
              className="input"
              onChange={(e) => setPhoneNUmber(e.target.value)}
            />
            <label htmlFor="email" className="label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required=""
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="cancel" onClick={closeDailog}>
              Cancel
            </button>
            <button className="submit" onClick={submitUser}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AllUsersDailog;
