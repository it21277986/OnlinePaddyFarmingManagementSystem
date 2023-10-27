import React, { useEffect, useState } from "react";
import './Dashboard.css';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if sidebar state is stored in local storage
    const storedSidebarState = localStorage.getItem("sidebarCollapsed");
    if (storedSidebarState) {
      setSidebarCollapsed(JSON.parse(storedSidebarState));
    }

	const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

        allSideMenu.forEach(item => {
            const li = item.parentElement;

            item.addEventListener('click', function () {
                allSideMenu.forEach(i => {
                    i.parentElement.classList.remove('active');
                })
                li.classList.add('active');
            })
        });

    // Add event listener to toggle the sidebar
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    menuBar.addEventListener('click', function () {
      const newSidebarState = !sidebarCollapsed;
      setSidebarCollapsed(newSidebarState);

      // Store the sidebar state in local storage
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newSidebarState));
    });

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
					<span class="text">Machine Registration</span>
				</a>
			</li>
			<li>
				<a href="/tender">
					<i class='bx bxs-doughnut-chart' ></i>
					<span class="text">Machine request</span>
				</a>
			</li>
			<li>
				<a href="/addpmprice">
					<i class='bx bxs-dollar-circle' ></i>
					<span class="text">Fuel Request</span>
				</a>
			</li>
			<li>
				<a href="/track">
					<i class='bx bxs-truck' ></i>
					<span class="text">Payment</span>
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



	{/* <!-- CONTENT --> */}
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
		{/* <!-- NAVBAR --> */}

		{/* <!-- MAIN --> */}
		<main>
			<div class="head-title">
				<div class="left">
					<h1>Dashboard</h1>
					<ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
						<li>
							<a class="active" href="#">Home</a>
						</li>
					</ul>
				</div>
				<a href="#" class="btn-download">
					<i class='bx bxs-cloud-download' ></i>
					<span class="text">Generate Report</span>
				</a>
			</div>

			<ul class="box-info">
				<li>
					<i class='bx bxs-home' ></i>
					<span class="text">
						<h3>10</h3>
						<p>Paddymills</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-collection' ></i>
					<span class="text">
						<h3>20T</h3>
						<p>Harvest</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-truck' ></i>
					<span class="text">
						<h3>20</h3>
						<p>Amount to distribute</p>
					</span>
				</li>
			</ul>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>Recent Activities</h3>
						<i class='bx bx-search' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<table>
						<thead>
							<tr>
								<th>Activity</th>
								<th>Date </th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									
									<p>Paddy mill added</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status completed">Completed</span></td>
							</tr>
							<tr>
								<td>
									
									<p>Tender processing</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									
									<p>Have to collect harvest</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status process">Process</span></td>
							</tr>
							<tr>
								<td>
									
									<p>Check paddymill capacity</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status pending">Pending</span></td>
							</tr>
							<tr>
								<td>
									
									<p>Collect product</p>
								</td>
								<td>01-10-2021</td>
								<td><span class="status completed">Completed</span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="todo">
					<div class="head">
						<h3>Todos</h3>
						<i class='bx bx-plus' ></i>
						<i class='bx bx-filter' ></i>
					</div>
					<ul class="todo-list">
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
						<li class="not-completed">
							<p>Todo List</p>
							<i class='bx bx-dots-vertical-rounded' ></i>
						</li>
					</ul>
				</div>
			</div>
		</main>
		{/* <!-- MAIN --> */}
	</section>
        </div>
    )
}