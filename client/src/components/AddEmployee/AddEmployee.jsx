import React, { useState, useEffect } from "react";
import styles from "./AddEmployee.module.css";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../../service/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [jobGrade, setJobGrade] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    name: "",
    jobGrade: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((res) => {
          setName(res.data.name);
          setJobGrade(res.data.jobGrade);
          setEmail(res.data.email);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleName = (e) => setName(e.target.value);
  const handlejobGrade = (e) => setJobGrade(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (validationForm()) {
      const employee = { name, jobGrade, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((res) => {
            console.log(res.data);
            navigator("/employees");
          })
          .catch((err) => console.error(err));
      } else {
        createEmployee(employee)
          .then((res) => {
            console.log(res.data);
            navigator("/employees");
          })
          .catch((err) => console.error(err));
      }
    }
  };

  const validationForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "직원의 이름을 입력해주세요.";
      valid = false;
    }

    if (jobGrade.trim()) {
      errorsCopy.jobGrade = "";
    } else {
      errorsCopy.jobGrade = "직원의 직급을 입력해주세요.";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "직원의 이메일을 입력해주세요.";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  };

  const title = () => {
    if (id) {
      return <h2>직원 정보 수정</h2>;
    } else {
      return <h2>직원 등록</h2>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        {title()}
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
            <button onClick={saveOrUpdateEmployee}>직원 등록</button>
          </div>
        </form>
      </div>
    </div>
  );
}
