import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Dashoboard/Dashboard.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import headerImageURL from '../images/Logo.png';

import { Link } from "react-router-dom";


export default function AllPaddymill() {
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

        //inital fetch paddymill
        

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

    const generatePDF = () => {

        const pdfDoc = new jsPDF();

        const imgWidth = 40;
        const imgHeight = 40;
        pdfDoc.addImage(headerImageURL, 'PNG', 85, 15, imgWidth, imgHeight);

        pdfDoc.setFontSize(18);
        pdfDoc.setTextColor(0, 0, 0);
        pdfDoc.text('Registed Society Report', 15, 70);

        const headers = ['No', 'ownerName', 'NIC', 'contactNo', 'address', 'district'];

        const data = paddymills.map((paddymill, index) => [
            index + 1,
            paddymill.ownerName,
            paddymill.NIC,
            paddymill.contactNo,
            paddymill.address,
            paddymill.district

        ]);

        const autoTableConfig = {
            startY: 80, 
            head: [headers],
          };
        
          pdfDoc.autoTable({ ...autoTableConfig, body: data });
        
          // Print the date in the footer
          const printedDate = new Date().toLocaleDateString();
          pdfDoc.setFontSize(12);
          pdfDoc.setTextColor(0, 0, 0);
          pdfDoc.text(`Printed on: ${printedDate}`, 15, pdfDoc.internal.pageSize.height - 15);

        pdfDoc.save('Registed Paddy Mill Report.pdf');
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



            <div className="container">
            <br/><br/>
                <button className="btn btn-success" onClick={generatePDF}>Generate PDF Report</button>
                <div className="container">
                    <div className="container"><br /><br /><br /><br />
                        <table className="table">
                            <thead>
                                <tr className="table-success">
                                    <th scope="col" style={{ fontSize: '13px' }}>No</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>Owner Name</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>NIC</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>Contact No</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>Address</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>District</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>Paddymill Reg No</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>Password</th>
                                    <th scope="col" style={{ fontSize: '13px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paddymills.map((paddymill, index) => (
                                    <tr key={paddymill._id}>
                                        <th scope="row" style={{ fontSize: '13px' }}>{index + 1}</th>
                                        <td style={{ fontSize: '13px' }}>{paddymill.ownerName}</td>
                                        <td style={{ fontSize: '13px' }}>{paddymill.NIC}</td>
                                        <td style={{ fontSize: '13px' }}>{paddymill.contactNo}</td>
                                        <td style={{ fontSize: '13px' }}>{paddymill.address}</td>
                                        <td style={{ fontSize: '13px' }}>{paddymill.district}</td>
                                        <td style={{ fontSize: '13px' }}>{paddymill.paddymillRegNo}</td>
                                        <td style={{ fontSize: '13px' }}>{paddymill.password}</td>
                                        <td className="d-flex justify-contenet-between">
                                            <Link to={`/editpm/${paddymill._id}`} className="btn btn-success">
                                                <i className="fas fa-pen" /> Edit
                                            </Link>
                                            <Link to={`/deletepm/${paddymill._id}`} className="btn btn-danger">
                                                <i className="fas fa-trash" /> Delete
                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        </div>)
}
