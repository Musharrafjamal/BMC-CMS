import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Nav from "../components/Navbars/Nav";
import Card from "../components/Card";

import Chart from "../components/charts/Chart";

import ShowTasks from "../components/todos/ShowTask";
import TaskInput from "../components/todos/TaskInput";

import { FaUsers, FaUsersCog } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
// import { HiCurrencyRupee } from "react-icons/hi";

import { db } from "../firebaseconfig";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getCountFromServer,
} from "firebase/firestore";

const Dashboard = ({ email }) => {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [adminUsers, setAdminUsers] = useState(0);
  const arrayOfAllusers = [];
  const arrayOfEmployeesName = [];
  const [employeeUserList, setEmployeeUserList] = useState(0);

  const gettingEmployeesCount = async () => {
    const empRef = collection(db, "employees");
    const employeeCollection = await getDocs(empRef);

    employeeCollection.forEach((doc) => {
      const data = doc.data();
      arrayOfEmployeesName.push(data.name);
    });
    setEmployeesCount(arrayOfEmployeesName.length);

    arrayOfEmployeesName.forEach(async (employeeName) => {
      const empRef = collection(db, employeeName);
      const employeeUsers = await getDocs(empRef);

      const filteredData = employeeUsers.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      filteredData.forEach((data) => {
        arrayOfAllusers.push(data.id);
      });

      setEmployeeUserList(arrayOfAllusers.length);
    });
  };
  const allusersCounting = async () => {
    const adminEmail = "musharraf@1.com";
    const adminRef = collection(db, adminEmail);
    const getAdminUsers = await getDocs(adminRef);

    const filteredData = getAdminUsers.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setAdminUsers(filteredData.length);
    filteredData.forEach((data) => {
      arrayOfAllusers.push(data.id);
    });
  };

  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const taskCollectionRef = collection(db, "tasks");
  const onAddingTask = async () => {
    try {
      await addDoc(taskCollectionRef, {
        task: taskInput,
      });
      getTaskList();
    } catch (err) {
      console.error(err);
    }
  };

  const getTaskList = async () => {
    try {
      const data = await getDocs(taskCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTaskList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteTask = async (id) => {
    const userDoc = doc(db, "tasks", id);
    try {
      await deleteDoc(userDoc);
    } catch (err) {
      console.error(err);
    }
    getTaskList();
  };
  useEffect(() => {
    getTaskList();
    EmployeeData();
    gettingEmployeesCount();
    allusersCounting();
    // eslint-disable-next-line
  }, []);

  // Chart Data
  const [employeeList, setEmployeeList] = useState([]);
  const EmployeeData = async () => {
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

  const nameOfEmployees = [];
  employeeList.forEach((emp) => {
    nameOfEmployees.push(emp.name);
  });


  const [usersCounting, setUsersCounting] = useState([]);

  const chartCounting = async () => {
    const counts = await Promise.all(
      employeeList.map(async (employeeName) => {
        const docRef = collection(db, employeeName.name);
        const snapshot = await getCountFromServer(docRef);
        return snapshot.data().count;
      })
    );
    setUsersCounting(counts);
  };
  useEffect(() => {
    // Fetch and set usersCounting on initial load and whenever employeeList changes
    chartCounting();
    // eslint-disable-next-line
  }, [employeeList]);

  

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        backgroundColor: [
          "#ff6b6b", // Coral
          "#6ab04c", // Emerald
          "#f19066", // Melon
          "#786fa6", // Lavender
          "#f9ca24"  // Sunflower
        ],
        borderColor: "black",
        borderWidth: 1,
        barThickness: 30,
        borderRadius: 2,
      },
    ],
  });

  useEffect(() => {
    const updatedUserData = {
      labels: nameOfEmployees,
      datasets: [
        {
          label: "Users Gained",
          data: usersCounting,
          backgroundColor: [
            "#ff6b6b", // Coral
            "#6ab04c", // Emerald
            "#f9ca24",  // Sunflower
            "#f19066", // Melon
            "#786fa6", // Lavender
          ],
          borderColor: "black",
          borderWidth: 1,
          barThickness: 35,
          borderRadius: 2,
        },
      ],
    };

    setUserData(updatedUserData);
    // eslint-disable-next-line
  }, [usersCounting]);

  return (
    <div className="dash-container">
      <Nav userName={email} />
      <div className="dash-main">
        <div className="dash-cards">
          <Card
            content={"Admin Users"}
            icon={<FiUsers size={40} color="white" />}
            countings={adminUsers}
            // currency={true}
          />
          <Card
            icon={<FaUsers size={40} color="white" />}
            content={"All Users"}
            countings={employeeUserList}
            className="dash-card"
          />
          <Card
            content={"Total employees"}
            icon={<FaUsersCog size={40} color="white" />}
            countings={employeesCount}
          />
        </div>
        <div className="dash-charts">
          <div className="dash-chart">
            <Chart chartData={userData} />
            <div className="task-input">
              <TaskInput setTaskInput={setTaskInput} onAddTask={onAddingTask} />
            </div>
          </div>
          <div className="task-section">
            <ShowTasks tasks={taskList} onDeleteTask={onDeleteTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
