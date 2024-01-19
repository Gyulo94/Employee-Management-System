import React, { useState } from "react";
import styles from "./AddEmployee.module.css";
import { createEmployee } from "../../service/EmployeeService";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [jobGrade, setJobGrade] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    jobGrade: "",
    email: "",
  });

  const handleName = (e) => setName(e.target.value);
  const handlejobGrade = (e) => setJobGrade(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const saveEmployee = (e) => {
    e.preventDefault();
    if (validationForm()) {
      const employee = { name, jobGrade, email };
      console.log(employee);

      createEmployee(employee).then((res) => {
        console.log(res.data);
        navigator("/employees");
      });
    }
  };

  const validationForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "올바른 직원의 이름을 입력해주세요.";
      valid = false;
    }

    if (jobGrade.trim()) {
      errorsCopy.jobGrade = "";
    } else {
      errorsCopy.jobGrade = "올바른 직원의 직급을 입력해주세요.";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "올바른 직원의 이메일을 입력해주세요.";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2>직원 등록</h2>
        <form>
          <label htmlFor="name">직원 이름</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            className={errors.name ? styles.inputValid : null}
            onChange={handleName}
          />
          {errors.name && <div className={styles.valid}> {errors.name}</div>}
          <label htmlFor="jobGrade">직원 직급</label>
          <input
            type="text"
            name="jobGrade"
            id="jobGrade"
            value={jobGrade}
            className={errors.jobGrade ? styles.inputValid : null}
            onChange={handlejobGrade}
          />
          {errors.jobGrade && (
            <div className={styles.valid}> {errors.jobGrade}</div>
          )}
          <label htmlFor="email">직원 이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            className={errors.email ? styles.inputValid : null}
            onChange={handleEmail}
          />
          {errors.email && <div className={styles.valid}> {errors.email}</div>}
          <div className={styles.buttonWrap}>
            <button onClick={saveEmployee}>직원 등록</button>
          </div>
        </form>
      </div>
    </div>
  );
}
