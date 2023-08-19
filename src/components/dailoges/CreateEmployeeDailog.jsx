import React from "react";
import "./CreateEmployeeDailog.css";


const CreateEmployeeDailog = ({ closeDailog, setUsername, setPassword, submitUser, setImageUpload, uploadImg, disableBtn }) => {
  
  return (
    <div className="all-user-dailog scale-up-center">
      <div className="all-user-form">
        <span className="title">Create new user</span>
        <div className="all-user-inputs">
          <div className="create-user-col-1">
            <label htmlFor="username" className="label">
              Full name
            </label>
            <input
              type="email"
              id="username"
              name="username"
              required=""
              className="input"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required=""
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="file" className="custom-file-input" onChange={(e) => setImageUpload(e.target.files[0])}></input>
            <button className="submit" onClick={uploadImg} >
              Upload Image
            </button>
            <button className="submit" onClick={submitUser} disabled={disableBtn} >
              Register
            </button>
            <button className="cancel" onClick={closeDailog} >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeDailog;
