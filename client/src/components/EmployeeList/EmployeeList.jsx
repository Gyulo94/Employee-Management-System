import React, { useEffect, useState } from "react";
import styles from "./EmployeeList.module.css";
import { deleteEmployee, listEmployee } from "../../service/EmployeeService";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = () => {
    listEmployee()
      .then((res) => setEmployees(res.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const removeEmployee = (id) => {
    console.log(id);

    deleteEmployee(id)
      .then((res) => getAllEmployee())
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.container}>
      {/* <div className={styles.buttonWrap}>
        <button>직원등록</button>
      </div> */}
      <h2 className={styles.title}>직원 목록</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>직원 ID</th>
            <th>직원 이름</th>
            <th>직원 직급</th>
            <th>직원 이메일</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.jobGrade}</td>
              <td>{emp.email}</td>
              <td className={styles.actions}>
                <button
                  className={styles.updateBtn}
                  onClick={() => updateEmployee(emp.id)}
                >
                  수정
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => removeEmployee(emp.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
