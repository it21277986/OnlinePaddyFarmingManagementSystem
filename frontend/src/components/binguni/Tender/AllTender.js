import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Dashoboard/Dashboard.css';



export default function AllTender() {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [tenders, setTenders] = useState([]);
    const [searchPrice, setSearchPrice] = useState(""); // State for search criteria


    const getTenders = () => {
        axios.get("http://localhost:8070/tender/tender").then((res) => {
            setTenders(res.data);
        }).catch((err) => {
            alert(err.message);
        });
    };

    useEffect(() => {
        getTenders();


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


    const handleSearch = () => {
        // Convert searchPrice to a number
        const lowestPrice = parseFloat(searchPrice);

        if (!isNaN(lowestPrice)) {
            // Filter the tenders based on the lowest price
            const filteredTenders = tenders.filter((tender) => {
                return parseFloat(tender.grindPrice) <= lowestPrice;
            });

            // Update the state with the filtered results
            setTenders(filteredTenders);
        } else {
            alert("Please enter a valid lowest price.");
        }
    };

    const resetFilter = () => {
        // Retrieve the original list of tenders (e.g., by making another Axios request)
        // and update the state with the original data.
        getTenders();
        setSearchPrice(""); // Clear the search bar
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
                        <a href="#">
                            <i class='bx bxs-dollar-circle' ></i>
                            <span class="text">Price</span>
                        </a>
                    </li>
                    <li>
                        <a href="track">
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
            </section>
            {/* <!-- NAVBAR --> */}


            <br /><br />
            <div className="container">
                <div className="mb-3">
                    <label className="form-label" style={{color: "black"}}><b>Search by Lowest Price</b></label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Lowest Price"
                            value={searchPrice}
                            onChange={(e) => setSearchPrice(e.target.value)}
                            style={{color: "black"}}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSearch()}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div>

                    <button
                        className="btn btn-secondary"
                        style={{color: "black"}}
                        onClick={resetFilter} >
                        Reset Filter
                    </button>

                    <table className="table">
                        <thead>
                            <tr className="table-success">
                                <th scope="col" style={{ fontSize: '13px' }}>No</th>
                                <th scope="col" style={{ fontSize: '13px' }}>Paddymill Name</th>
                                <th scope="col" style={{ fontSize: '13px' }}>Paddymill No</th>
                                <th scope="col" style={{ fontSize: '13px' }}>District</th>
                                <th scope="col" style={{ fontSize: '13px' }}>Capacity</th>
                                <th scope="col" style={{ fontSize: '13px' }}>Lorry Count</th>
                                <th scope="col" style={{ fontSize: '13px' }}>Rice Type</th>
                                <th scope="col" style={{ fontSize: '13px' }}>Grind Price</th>
                                <th scope="col" style={{ fontSize: '13px' }}>Transport Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenders.map((tender, index) => (
                                <tr key={tender._id}>
                                    <th scope="row" style={{ fontSize: '13px' }}>{index + 1}</th>
                                    <td style={{ fontSize: '13px' }}>{tender.PaddymillName}</td>
                                    <td style={{ fontSize: '13px' }}>{tender.pmNo}</td>
                                    <td style={{ fontSize: '13px' }}>{tender.district}</td>
                                    <td style={{ fontSize: '13px' }}>{tender.capacity}</td>
                                    <td style={{ fontSize: '13px' }}>{tender.lorryCount}</td>
                                    <td style={{ fontSize: '13px' }}>{tender.riceType}</td>
                                    <td style={{ fontSize: '13px' }}>{tender.grindPrice}</td>
                                    <td style={{ fontSize: '13px' }}>{tender.transportPrice}</td>
                                </tr>
                            ))}




                        </tbody>
                    </table>


                </div>

            </div>
        </div>
    )
}