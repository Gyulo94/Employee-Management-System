import React from "react";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigator = useNavigate();

  const addNewEmployee = () => {
    navigator("/add-employee");
  };
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/">직원 관리 시스템</Link>
      </div>
      <div className={styles.right}>
        <button onClick={addNewEmployee}>직원등록</button>
      </div>
    </header>
  );
}
