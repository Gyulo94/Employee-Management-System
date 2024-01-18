import "./App.css";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AddEmployee from "./components/AddEmployee/AddEmployee";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
