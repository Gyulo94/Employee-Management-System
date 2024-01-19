import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AddEmployee from "./components/AddEmployee/AddEmployee";

function App() {
  const Layout = () => {
    return (
      <div>
        <Outlet />
        <Footer />
      </div>
    );
  };

  return (
    <>
      <Header />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Route>
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<AddEmployee />} />
      </Routes>
    </>
  );
}

export default App;
