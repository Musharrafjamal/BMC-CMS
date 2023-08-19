import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Nav from "../components/Navbars/Nav";
import Card from "../components/Card";

import Chart from "../components/charts/Chart";
import { UserData } from "../components/charts/Data";

import ShowTasks from "../components/todos/ShowTask";
import TaskInput from "../components/todos/TaskInput";

import { FaUsers, FaUsersCog } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi";

import { db } from "../firebaseconfig";
import { getDocs, collection } from "firebase/firestore";

const Dashboard = ({ email }) => {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["seagreen"],
        borderColor: "black",
        borderWidth: 1,
        barThickness: 30,
        borderRadius: 2,
      },
      {
        label: "Users Losts",
        data: UserData.map((data) => data.userLost),
        backgroundColor: ["orangered"],
        borderColor: "black",
        borderWidth: 1,
        barThickness: 30,
        borderRadius: 2,
      },
    ],
  });

  const [allUserList, setAllUserList] = useState([])

  const gettingEmployeesCount = async () => {
    const arrayOfEmployeesName = [];
    const empRef = collection(db, "employees");
    const employeeCollection = await getDocs(empRef);

    employeeCollection.forEach((doc) => {
      const data = doc.data();
      arrayOfEmployeesName.push(data.name);
    });
    setEmployeesCount(arrayOfEmployeesName.length);

    const arrayOfAllusers = [];
    arrayOfEmployeesName.forEach(async (employeeName) => {
      console.log(employeeName);
      const empRef = collection(db, employeeName);
      const employeeUsers = await getDocs(empRef);

      const filteredData = employeeUsers.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      
      console.log(filteredData)
    });
    // console.log(arrayOfAllusers)
    // arrayOfAllusers.forEach((newDoc) => {
    //   const newData = newDoc.data();
    //   console.log(newData);
    // });

    // console.log(arrayOfAllusers);
  };

  const allusersCounting = () => {
    // arrayOfEmployeesName.forEach(employee =>{
    //   console.log(employee)
    // })
  };

  useEffect(() => {
    gettingEmployeesCount();
    allusersCounting();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="dash-container">
      <Nav userName={email} />
      <div className="dash-main">
        <div className="dash-cards">
          <Card
            icon={<FaUsers size={40} color="white" />}
            content={"All Users"}
            countings={750}
            className="dash-card"
          />
          <Card
            content={"Total employees"}
            icon={<FaUsersCog size={40} color="white" />}
            countings={employeesCount}
          />
          <Card
            content={"Total revenue"}
            icon={<HiCurrencyRupee size={40} color="white" />}
            countings={40000}
            currency={true}
          />
        </div>
        <div className="dash-charts">
          <div className="dash-chart">
            <Chart chartData={userData} />
            <div className="task-input">
              <TaskInput />
            </div>
          </div>
          <div className="task-section">
            <ShowTasks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
