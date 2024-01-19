import React, { useEffect, useState } from "react";
import styles from "./EmployeeList.module.css";
import { listEmployee } from "../../service/EmployeeService";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployee()
      .then((res) => setEmployees(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <th>{emp.id}</th>
              <th>{emp.name}</th>
              <th>{emp.jobGrade}</th>
              <th>{emp.email}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
