import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./components/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Dashboard() {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div className="layoutSidenav d-flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="container-fluid mt-5">
          <main>
            <h1>Welcome to Dashboard</h1>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
