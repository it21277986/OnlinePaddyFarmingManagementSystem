import React, { useEffect, useState } from "react";
import './Dashboardceo.css';
import AllSeedsdisplay from './Allseedsdisplay';

export default function Dashboardceo() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if sidebar state is stored in local storage
    const storedSidebarState = localStorage.getItem("sidebarCollapsed");
    if (storedSidebarState) {
      setSidebarCollapsed(JSON.parse(storedSidebarState));
    }

    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    if (allSideMenu) {
      allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
          allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
          });
          li.classList.add('active');
        });
      });
    }
    // Add event listener to toggle the sidebar
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    if (menuBar) {
      menuBar.addEventListener('click', function () {
        const newSidebarState = !sidebarCollapsed;
        setSidebarCollapsed(newSidebarState);

        // Store the sidebar state in local storage
        localStorage.setItem("sidebarCollapsed", JSON.stringify(newSidebarState));
      });
    }

    // Add event listener for window resize
    window.addEventListener('resize', function () {
      if (window.innerWidth > 576) {
        setSidebarCollapsed(false);
        // Store the sidebar state in local storage
        localStorage.setItem("sidebarCollapsed", JSON.stringify(false));
      }
    });

    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    const sidebar = document.getElementById('sidebar');

    menuBar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    });

    searchButton.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
          searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    });

    if (window.innerWidth < 768) {
      sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace('bx-x', 'bx-search');
      searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
      }
    });

    const switchMode = document.getElementById('switch-mode');

    switchMode.addEventListener('change', function () {
      if (this.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    });
  }, [sidebarCollapsed]);

  return (
    <div>
      <section id="sidebar" className={sidebarCollapsed ? 'hide' : ''}>
        <a href="#" className="brand">
          <i className='bx bxs-home'></i>
          <span className="text">Crop Establishment Management</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="/dboard">
              <i className='bx bxs-dashboard' ></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/allseeds">
            <i class='bx bxs-bar-chart-alt-2'></i>
              <span className="text">Stock Maintains</span>
            </a>
          </li>
          <li>
            <a href="/allreq">
              <i className='bx bxs-doughnut-chart' ></i>
              <span className="text">Seed Requests</span>
            </a>
          </li>
          <li>
            <a href="/addpaddy">
            <i class='bx bxs-add-to-queue'></i>
              <span className="text">Add Paddy Varities</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout">
              <i className='bx bxs-log-out-circle' ></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content">
        <nav>
          <i className='bx bx-menu' ></i>
          <a href="#" className="nav-link">Categories</a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn"><i className='bx bx-search' ></i></button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <i className='bx bxs-bell' ></i>
            <span className="num">7</span>
          </a>
          <a href="#" className="profile">
            <img src="./me.jpg" alt="Profile" />
          </a>
        </nav>
  
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Crop Establishment Management</a>
                </li>

              </ul>
            </div>
          </div>
          <ul className="box-info">
            <li>
            <i class='bx bx-loader'></i>
              <span className="text">
                <h3>7</h3>
                <p>Pending Seeds Requests</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-collection' ></i>
              <span className="text">
                <h3>12T</h3>
                <p>Remaining Seed Stock</p>
              </span>
            </li>
            <li>
              <i className='bx bxs-truck' ></i>
              <span className="text">
                <h3>34T</h3>
                <p>Distributed Amount</p>
              </span>
            </li>
          </ul>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3></h3>
                <i className='bx bx-search' ></i>
                <i className='bx bx-filter' ></i>
              </div>
              <table>
                <AllSeedsdisplay />
              </table>
            </div>
            <div className="todo">
              <div className="head">
                <h3>Weather</h3>
              </div>
              <ul className="todo-list">
                <a href="#" className="weather">
                  <img className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                    src="thimalkaimg/Digital-Signage-Weekly-Weather-Forecast-Green.png" alt="..." />
                </a>
              </ul>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
