import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import "./AllUsers.css";
import AllUsersNav from "../components/Navbars/AllUsersNav";
import AllUsersDailog from '../components/dailoges/AllUsersDailog'
import UpdateDailog from "../components/dailoges/UpdateDailog";

import {
  getDocs,
  // getDoc,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseconfig";

const AllUsers = ({ email }) => {
  const [openDailog, setOpenDailog] = useState(false);
  const [userList, setUserList] = useState([]);

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  today = `${dd}-${mm}-${yyyy} `;

  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNUmber] = useState("");
  const [userEmail, setUserEmail] = useState("");

  //updated states

  const [updateDailogOpen, setUpdateDailogOpen] = useState(false);

  const [updatedFullname, setUpdatedFullname] = useState("");
  const [updatedGender, setUpdatedGender] = useState("");
  const [updatedAge, setUpdatedAge] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
  const [updateUserEmail, setUpdateUserEmail] = useState("");

  const [userId, setuserId] = useState("");

  const userCollectionRef = collection(db, email);

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
    //eslint-disable-next-line
  }, [fullname]);

  const onSubmitUser = async () => {
    try {
      await addDoc(userCollectionRef, {
        fullname: fullname,
        age: age,
        gender: gender,
        phone: phoneNumber,
        email: userEmail,
        date: today,
        userId: auth?.currentUser?.uid,
      });
      getUserList();
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteUser = async (id) => {
    const userDoc = doc(db, email, id);
    try {
      await deleteDoc(userDoc);
    } catch (err) {
      console.error(err);
    }
    getUserList();
  };

  const takingUserId = (id) => {
    setuserId(id);
  };



  const onUpdateUser = async () => {
    const userDoc = doc(db, email, userId);
    try {
      await updateDoc(userDoc, {
        fullname: updatedFullname,
        gender: updatedGender,
        age: updatedAge,
        phone: updatedPhoneNumber,
        email: updateUserEmail,
      });
    } catch (err) {
      console.error(err);
    }
    getUserList();
  };
  // const [userName, setUserName] = useState('')
  // const [userGender, setUserGender] = useState('')
  // const [userAge, setUserAge] = useState('')
  // const [updatedEmail, setUpdatedEmail] = useState('')
  // const [userPhone, setUserPhone] = useState('')
  // const getUserData = async () => {
  //   const userDoc = doc(db, email, userId);
  //   try{
  //     const docSnap = await getDoc(userDoc);
  //     const user = docSnap.data()
  //     setUserName(user.fullname)
  //     setUserGender(user.gender)
  //     setUserAge(user.age)
  //     setUserPhone(user.phone)
  //     setUpdatedEmail(user.email)
  //   }catch(err) {
  //     console.error(err)
  //   }

  // }

  return (
    <div className="all-user-container">
      <div className="nav">
        <AllUsersNav userName={email} setOpendailog={setOpenDailog} />
      </div>
      {openDailog && (
        <div className="alluser-dailog">
          <AllUsersDailog
            closeDailog={() => setOpenDailog(false)}
            setUsersList={setUserList}
            setFullname={setFullname}
            setAge={setAge}
            setGender={setGender}
            setPhoneNUmber={setPhoneNUmber}
            setEmail={setUserEmail}
            submitUser={onSubmitUser}
          />
        </div>
      )}
      {updateDailogOpen && (
        <div className="alluser-dailog">
          <UpdateDailog
            setUpdateDailogOpen={() => setUpdateDailogOpen(false)}
            setUpdatedFullname={setUpdatedFullname}
            setUpdatedGender={setUpdatedGender}
            setUpdatedAge={setUpdatedAge}
            setUpdatedPHoneNUmber={setUpdatedPhoneNumber}
            setUpdatedUserEmail={setUpdateUserEmail}
            onUpdateUser={onUpdateUser}
          />
        </div>
      )}

      <Table
        listOfUsers={userList}
        onDeleteUser={onDeleteUser}
        passingUserId={takingUserId}
        setOpenDailog={setUpdateDailogOpen}
      />
    </div>
  );
};

export default AllUsers;
