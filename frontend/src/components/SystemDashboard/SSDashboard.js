import React, { useEffect, useState } from "react";
import axios from "axios";
import './Dashboard.css';
import { PieChart, Pie, Tooltip, XAxis, YAxis, Legend, BarChart, Bar, CartesianGrid, Cell } from 'recharts';

export default function SSDashboard() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

	const data1 = [

		{ name: "Jan", value: 50 },
		{ name: "Feb", value: 40 },
		{ name: "March", value: 30 },
		{ name: "April", value: 60 },
		{ name: "May", value: 20 },
		{ name: "June", value: 100 },
		{ name: "July", value: 90 },
		{ name: "Aug", value: 70 },
		{ name: "Sep", value: 20 }
	];

	const data2 = [
		{ name: "Jan", value: 50 },
		{ name: "Feb", value: 40 },
		{ name: "March", value: 30 },
		{ name: "April", value: 90 }
	];
	const COLORS = ['#008000', '#4CBB17', '#32CD32', '#7CFC00'];

	const [societyCount, setSocietyCount] = useState(0);
	useEffect(() => {
		function getSocieties() {
			axios.get("http://localhost:8070/society/Society")
				.then((res) => {
					// Set the ticket count based on the length of the response data array
					setSocietyCount(res.data.length);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getSocieties();
	}, []);

	const [ticketCount, setTicketCount] = useState(0);
	useEffect(() => {
		function getTickets() {
			axios.get("http://localhost:8070/ticket/ticket")
				.then((res) => {
					// Set the ticket count based on the length of the response data array
					setTicketCount(res.data.length);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getTickets();
	}, []);

	const [breakdownCount, setBreakdownCount] = useState(0);
	useEffect(() => {
		function getBreakdowns() {
			axios.get("http://localhost:8070/breakdown/Breakdown")
				.then((res) => {
					// Set the ticket count based on the length of the response data array
					setBreakdownCount(res.data.length);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getBreakdowns();
	}, []);

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
					<span class="text">Society & System Management</span>
				</a>
				<ul className={`side-menu top`}>
					<li class="active">
						<a href="/ssdashboard">
							<i class='bx bxs-dashboard' ></i>
							<span class="text">Dashboard</span>
						</a>
					</li>
					<li>
						<a href="/Society">
							<i class='bx bxs-home' ></i>
							<span class="text">Society Details</span>
						</a>
					</li>
					<li>
						<a href="/ticket">
							<i class='bx bxs-doughnut-chart' ></i>
							<span class="text">Ticket Details</span>
						</a>
					</li>
					<li>
						<a href="/Breakdown">
							<i class='bx bxs-dollar-circle' ></i>
							<span class="text">System Breakdown</span>
						</a>
					</li>
					<li>
						<a href="#">
							<i class='bx bxs-truck' ></i>
							<span class="text">Breakdown catalogue</span>
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
						<a href="/" class="logout">
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
							<input type="search" placeholder="Search..." />
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
						<img src="./me.jpg" />
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
					</div>

					<ul class="box-info">
						<li>
							<i class='bx bxs-fa-handshake' ><i className="fas fa-handshake fa-2x text-gray-300"></i></i>
							<span class="text">
								<h3>{societyCount}</h3>
								<p>Total Society</p>
							</span>
						</li>
						<li>
							<i class='bx bxs-ticket' ><i className="fas fa-ticket fa-2x text-gray-300"></i></i>
							<span class="text">
								<h3>{ticketCount}</h3>
								<p>Total Ticket</p>
							</span>
						</li>
						<li>
							<i class='bx bxs-' ><i className="fas fa-wrench fa-2x text-gray-300"></i></i>
							<span class="text">
								<h3>{breakdownCount}</h3>
								<p>System Breakdown</p>
							</span>
						</li>
					</ul>


					<div class="table-data">
						<div class="order">
							<div class="head">
								<h3>Raised Ticket Overview</h3>
							</div>

							{/*  <!-- Card Body --> */}
							<div className="card-body ">
								<div className="App container">
									<BarChart
										width={950}
										height={400}
										data={data1}
										margin={{
											top: 5,
											right: 70,
											left: 1,
											bottom: 5,
										}}
										barSize={15} >
										<XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
										<YAxis />
										<Tooltip />
										<Legend />
										<CartesianGrid strokeDasharray="3 3" />
										<Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }}>
											{data1.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Bar>
									</BarChart>
								</div>
							</div>

						</div>
						<div class="todo">
							<div class="head">
								<h3>System Breakdown</h3>
							</div>

							<div className="card-body">
								<div className="App">
									<PieChart width={400} height={400}>
										<Pie
											dataKey="value"
											isAnimationActive={false}
											data={data2}
											cx={250}
											cy={200}
											outerRadius={80}
											fill="#8884d8"
											label
										>
											{data2.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</div>
							</div>

						</div>
					</div>
				</main>
				{/* <!-- MAIN --> */}
			</section>
		</div>
	)
}