import React, { useState, useEffect } from "react";
import axios from "axios";
import "./track.css";
import '../Dashoboard/Dashboard.css';
import { Link } from "react-router-dom";



function Track() {
  const [paddymills, setPaddymills] = useState([]);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        // Function to get paddymills data
        function getPaddymills() {
            axios.get("http://localhost:8070/paddymill/pm")
                .then((res) => {
                    setPaddymills(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }

        // Initial fetch of paddymills
        getPaddymills();

        // Check if sidebar state is stored in local storage
        const storedSidebarState = localStorage.getItem("sidebarCollapsed");
        if (storedSidebarState) {
            setSidebarCollapsed(JSON.parse(storedSidebarState));
        }

        // Event listener for the sidebar toggle
        const menuBar = document.querySelector('#content nav .bx.bx-menu');
        if (menuBar) {
            menuBar.addEventListener('click', function () {
                const newSidebarState = !sidebarCollapsed;
                setSidebarCollapsed(newSidebarState);
                // Store the sidebar state in local storage
                localStorage.setItem("sidebarCollapsed", JSON.stringify(newSidebarState));
            });
        }

        // Event listener for window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 576) {
                setSidebarCollapsed(false);
                // Store the sidebar state in local storage
                localStorage.setItem("sidebarCollapsed", JSON.stringify(false));
            }
        });

        // Add event listener for switch mode if switch-mode element exists
        const switchMode = document.getElementById('switch-mode');
        if (switchMode) {
            switchMode.addEventListener('change', function () {
                if (this.checked) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
            });
        }
    }, [sidebarCollapsed]);

  const stages = [
    "Order Processed",
    "Order Shipped",
    "Order Enroute",
    "Order Arrived"
  ];

  const [currentStage, setCurrentStage] = useState(0);

  const nextStage = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  return (
    <div>
       {/* <!-- SIDEBAR --> */}
       <section id="sidebar" className={sidebarCollapsed ? 'hide' : ''}>
            <a href="#" class="brand">
                <i class='bx bxs-home'></i>
                <span class="text">Paddymill Management</span>
            </a>
            <ul className={`side-menu top`}>
                <li class="active">
                    <a href="/dashboard">
                        <i class='bx bxs-dashboard' ></i>
                        <span class="text">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="/pm">
                        <i class='bx bxs-home' ></i>
                        <span class="text">Paddymills</span>
                    </a>
                </li>
                <li>
                    <a href="/tender">
                        <i class='bx bxs-doughnut-chart' ></i>
                        <span class="text">Tenders</span>
                    </a>
                </li>
                <li>
                    <a href="/addpmprice">
                        <i class='bx bxs-dollar-circle' ></i>
                        <span class="text">Price</span>
                    </a>
                </li>
                <li>
                    <a href="/track">
                        <i class='bx bxs-truck' ></i>
                        <span class="text">Distribution</span>
                    </a>
                </li>
            </ul>
            <ul class="side-menu">
                <li>
                    <a href="#">
                        <i class='bx bxs-cog' ></i>
                        <span class="text">Settings</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="logout">
                        <i class='bx bxs-log-out-circle' ></i>
                        <span class="text">Logout</span>
                    </a>
                </li>
            </ul>
        </section>
    
        {/* <!-- SIDEBAR --> */}
    

    

        <section id="content">
		{/* <!-- NAVBAR --> */}
		<nav>
			<i class='bx bx-menu' ></i>
			<a href="#" class="nav-link">Categories</a>
			<form action="#">
				<div class="form-input">
					<input type="search" placeholder="Search..."/>
					<button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
				</div>
			</form>
			<input type="checkbox" id="switch-mode" hidden />
			<label for="switch-mode" class="switch-mode"></label>
			<a href="#" class="notification">
				<i class='bx bxs-bell' ></i>
				<span class="num">8</span>
			</a>
			<a href="#" class="profile">
				<img src="./me.jpg"/>
			</a>
		</nav>
        </section>
		{/* <!-- NAVBAR --> */}

    <div className="Appbt">
      <h1 className="h1bt">Vehicle Tracking System</h1>
      <div className="progress-bar">
        {stages.map((stage, index) => (
          <div
            key={index}
            style={{color: "black"}}
            className={`progress-step ${index <= currentStage ? "active" : ""}`}
          >
            {stage}
          </div>
        ))}
      </div>
      <div className="buttonsbt">
        <button className="buttonbT" onClick={prevStage} disabled={currentStage === 0}>
          Previous
        </button>
        <button className="buttonbT" onClick={nextStage} disabled={currentStage === stages.length - 1}>
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default Track;

