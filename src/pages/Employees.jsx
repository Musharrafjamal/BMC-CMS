import React, { useState, useEffect } from "react";
import "./Employees.css";
import EmployeeCard from "../components/employees/EmployeeCard";
import EmployeesNav from "../components/Navbars/EmployeesNav";
import CreateEmployeeDailog from "../components/dailoges/CreateEmployeeDailog";
import { auth, db, storage } from "../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { collection, getDocs, addDoc } from "firebase/firestore";

const Employees = ({ email }) => {
  const [openDailog, setOpenDailog] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);
  const [employeeImgUrl, setEmployeeImgUrl] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [enableButton, setEnableButton] = useState(true);

  const userCollectionRef = collection(db, "employees");
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  today = `${dd}-${mm}-${yyyy} `;

  const oncCreateUser = async () => {
    try {
      setEnableButton(true)
      await createUserWithEmailAndPassword(auth, username, password);

      await addDoc(userCollectionRef, {
        name: username,
        password: password,
        imgUrl: employeeImgUrl,
        date: today,
      });

      getUserList();
      setOpenDailog(false);
    } catch (err) {
      console.error(err);
    }
  };
  const getUserList = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserList();
    // eslint-disable-next-line
  }, []);

  const uploadImg = async () => {
    try {
      const imageRef = ref(storage, `employeesPhotos/${username}`);
      await uploadBytes(imageRef, uploadImage);

      const imgRef = ref(storage, `employeesPhotos/${username}`);
      await getDownloadURL(imgRef)
        .then((url) => {
          setEmployeeImgUrl(url);
        })
        .catch((err) => {
          console.log(err);
        });
        setTimeout(() => {
          setEnableButton(false);
        }, 5000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="employees-container">
      {openDailog && (
        <div className="alluser-dailog">
          <CreateEmployeeDailog
            closeDailog={() => setOpenDailog(false)}
            setUsername={setUsername}
            setPassword={setPassword}
            submitUser={oncCreateUser}
            setImageUpload={setUploadImage}
            uploadImg={uploadImg}
            disableBtn={enableButton}
          />
        </div>
      )}
      <EmployeesNav userName={email} onClick={() => setOpenDailog(true)} />
      <div className="emp-main-conatiner">
        <h1>All Employees</h1>
        <div className="emp-cards-container">
          <EmployeeCard userList={userList} />
        </div>
      </div>
    </div>
  );
};

export default Employees;
