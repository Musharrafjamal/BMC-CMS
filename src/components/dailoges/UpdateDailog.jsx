import React from 'react'
import "./AllUsersDailog.css";

const UpdateDailog = ({
    setUpdateDailogOpen,
    setUpdatedFullname,
    setUpdatedGender,
    setUpdatedAge,
    setUpdatedPHoneNUmber,
    setUpdatedUserEmail,
    onUpdateUser
  }) => {
    return (
      <div className="all-user-dailog">
        <div className="all-user-form">
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
                className="input"
                onChange={(e) => {setUpdatedFullname(e.target.value)}}
              />
              <label htmlFor="gender" className="label">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                className="input"
                onChange={(e) => setUpdatedGender(e.target.value)}
              />
              <label htmlFor="age" className="label">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                className="input"
                onChange={(e) => setUpdatedAge(e.target.value)}
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
                className="input"
                onChange={(e) => setUpdatedPHoneNUmber(e.target.value)}
              />
              <label htmlFor="email" className="label">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                onChange={(e) => setUpdatedUserEmail(e.target.value)}
              />
              <button className="cancel" onClick={setUpdateDailogOpen}>
                Cancel
              </button>
              <button className="submit" onClick={onUpdateUser}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default UpdateDailog