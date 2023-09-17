import React, { useState, useEffect } from "react";
import "./Table.css";
import { FiUserMinus } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseconfig";

const Table = ({
  listOfUsers,
  onDeleteUser,
  passingUserId,
  setOpenDailog,
  email,
}) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [arrayOfUsers, setArrayOfUsers] = useState([]);

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
  }, []);

  useEffect(() => {
    async function fetchData() {
      const array = [];
      try {
        const names = employeeList
          .map((employee) => employee.name)
          .filter((name) => name);
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
    }

    fetchData();
  }, [employeeList]);

  const [finalArray, setFinalArray] = useState([]);

  useEffect(() => {
    setFinalArray([...listOfUsers, ...arrayOfUsers]);
  }, [arrayOfUsers, listOfUsers]);

  const [userlist, setUserList] = useState([])
  useEffect(() => {

    if (email === process.env.REACT_APP_ADMIN_EMAIL) {
      setUserList(finalArray)
    }
    else{
      setUserList(listOfUsers)
    }
  }, [finalArray, listOfUsers, userlist])

  return (
    <div className="table-container">
      <table>
        <caption>User details</caption>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Father's name</th>
            <th>Mobile number</th>
            <th>Gender</th>
            <th>Category</th>
            <th>Date</th>
            <th>Refrence</th>
            <th>Result</th>
            <th>Important</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.fatherName}</td>
                <td>{user.phone}</td>
                <td>{user.gender}</td>
                <td>{user.category}</td>
                <td>{user.date}</td>
                <td>{user.refrence}</td>
                <td>{user.result}</td>
                <td>{user.important}</td>
                <td>
                  <button
                    className="delete-task-btn"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    {<FiUserMinus size={18} />}
                  </button>
                  <button
                    className="update-task-btn"
                    onClick={() => {
                      passingUserId(user.id);
                      setOpenDailog(true);
                    }}
                  >
                    {<BiMessageSquareDetail size={18} />}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
