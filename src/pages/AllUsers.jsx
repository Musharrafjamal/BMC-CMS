import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import "./AllUsers.css";
import AllUsersNav from "../components/Navbars/AllUsersNav";
import AllUsersDailog from "../components/dailoges/AllUsersDailog";
import InformationBox from "../components/dailoges/InformationBox";
import UserToDo from "../components/dailoges/UserToDo";
import {
  getDocs,
  // getDoc,
  collection,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebaseconfig";

const AllUsers = ({ email }) => {
  const [openDailog, setOpenDailog] = useState(false);
  const [userList, setUserList] = useState([]);

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  today = `${dd}-${mm}-${yyyy}`;

  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [phoneNumber, setPhoneNUmber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [refrence, setRefrence] = useState("");
  const [result, setResult] = useState("");
  const [date, setDate] = useState("");
  const [important, setImportant] = useState("");

  const [updateDailogOpen, setUpdateDailogOpen] = useState(false);
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
        category: category,
        gender: gender,
        phone: phoneNumber,
        fatherName: fatherName,
        date: date,
        result: result,
        refrence: refrence,
        important: important,
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
  const [info, setInfo] = useState("");
  // const [index, setindex] = useState(0);

  const onOpenBox = async () => {
    try {
      const documentRef = doc(db, email, userId);
      const subcollectionRef = collection(documentRef, "information");

      const data = await getDocs(subcollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let infoIndex = filteredData.length + 1

      await addDoc(subcollectionRef, {
        info: info,
        index: infoIndex,
      });
      infoIndex += 1
      getInfo();
    } catch (err) {
      console.error(err);
    }
    getUserList();
  };
  const [infoList, setInfoLIst] = useState([]);
  const getInfo = async () => {
    try {
      const documentRef = doc(db, email, userId);
      const subcollectionRef = collection(documentRef, "information");

      const data = await getDocs(subcollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInfoLIst(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  // Task

  const [taskDailog, setTaskDailog] = useState(false);
  const [userTaskText, setUserTaskText] = useState("");
  const [userTaskList, setUserTaskList] = useState([]);

  const onAddingTask = async () => {
    try {
      const collectionRef = collection(db, "employees");

      const q = query(collectionRef, where("name", "==", email));
      const querySnapshot = await getDocs(q);

      let userid;
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          userid = doc.id;
        } else {
          console.log("Document does not exist.");
        }
      });
      const documentRef = doc(db, "employees", userid);
      const subcollectionRef = collection(documentRef, "tasks");

      const data = await getDocs(subcollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      
      let taskIndex = filteredData.length + 1
      // console.log('starting index: ', taskIndex)
      
      await addDoc(subcollectionRef, {
        task: userTaskText,
        index: taskIndex,
      });
      
      taskIndex += 1
      // console.log('After increment: ',taskIndex)
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const getTasks = async () => {
    try {
      const collectionRef = collection(db, "employees");

      const q = query(collectionRef, where("name", "==", email));
      const querySnapshot = await getDocs(q);

      let userid;
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          userid = doc.id;
        } else {
          console.log("Document does not exist.");
        }
      });
      const documentRef = doc(db, "employees", userid);
      const subcollectionRef = collection(documentRef, "tasks");

      const data = await getDocs(subcollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserTaskList(filteredData);
      // setLengthOfTaskArray(filteredData.length);
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteTask = async (id) => {
    try {
      const collectionRef = collection(db, "employees");

      const q = query(collectionRef, where("name", "==", email));
      const querySnapshot = await getDocs(q);

      let userid;
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          userid = doc.id;
        } else {
          console.log("Document does not exist.");
        }
      });
      const documentRef = doc(db, "employees", userid);
      const subcollectionRef = collection(documentRef, "tasks");

      const userDoc = doc(subcollectionRef, id);
      await deleteDoc(userDoc);
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const [employeeList, setEmployeeList] = useState([]);
  const gettingEmployeesName = async () => {
    try {
      const empRef = collection(db, "employees");
      const data = await getDocs(empRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployeeList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    gettingEmployeesName();
    // eslint-disable-next-line
  }, []);

  const [arrayOfUsers, setArrayOfUsers] = useState([]);

  useEffect(() => {
    function getAllNamesFromEmployeeList(employeeList) {
      return employeeList.map((employee) => employee.name);
    }

    const names = getAllNamesFromEmployeeList(employeeList);

    const fetchData = async () => {
      const array = [];
      try {
        await Promise.all(
          names.map(async (name) => {
            const empRef = collection(db, name);
            const data = await getDocs(empRef);
            const filteredData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            array.push(...filteredData);
          })
        );
        setArrayOfUsers(array);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // Move the function call inside the useEffect
  }, [employeeList]); // Only trigger the effect when employeeList changes

  useEffect(() => {
    // console.log(arrayOfUsers);
  }, [arrayOfUsers]);

  return (
    <div className="all-user-container">
      <div className="nav">
        <AllUsersNav
          userName={email}
          setOpendailog={setOpenDailog}
          setTaskDailog={setTaskDailog}
        />
      </div>
      {openDailog && (
        <div className="alluser-dailog">
          <AllUsersDailog
            closeDailog={() => setOpenDailog(false)}
            setUsersList={setUserList}
            setFullname={setFullname}
            setCategory={setCategory}
            setGender={setGender}
            setPhoneNUmber={setPhoneNUmber}
            setFatherName={setFatherName}
            submitUser={onSubmitUser}
            setDate={setDate}
            setRefrence={setRefrence}
            setResult={setResult}
            setImportant={setImportant}
          />
        </div>
      )}
      {updateDailogOpen && (
        <div className="alluser-dailog">
          <InformationBox
            setUpdateDailogOpen={() => setUpdateDailogOpen(false)}
            onOpenBox={onOpenBox}
            setInfo={setInfo}
            infoList={infoList}
            getInfo={getInfo}
          />
        </div>
      )}
      {taskDailog && (
        <div className="alluser-dailog">
          <UserToDo
            closeDailog={setTaskDailog}
            setUserTaskText={setUserTaskText}
            onAddingTask={onAddingTask}
            userTaskList={userTaskList}
            getTasks={getTasks}
            onDeleteTask={onDeleteTask}
          />
        </div>
      )}

      <Table
        listOfUsers={userList}
        onDeleteUser={onDeleteUser}
        passingUserId={setuserId}
        setOpenDailog={setUpdateDailogOpen}
        email={email}
      />
    </div>
  );
};

export default AllUsers;
