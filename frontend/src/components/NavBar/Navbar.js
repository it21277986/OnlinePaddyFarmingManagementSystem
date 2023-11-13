import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        // <nav className="navbar navbar-expand-lg bg-light">
        //     <div className="container-fluid">
        //         <Link to={'#'} className="navbar-brand">Home</Link>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                 <li className="nav-item">
        //                     <Link to={'#'} className="nav-link active" aria-current="page">About Us</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link to={'#'} className="nav-link active">Link</Link>
        //                 </li>
        //                 <li className="nav-item dropdown">
        //                     <Link to={'#'} className="nav-link dropdown-toggle active" data-bs-toggle="dropdown" aria-expanded="false">Downloads</Link>
        //                     <ul className="dropdown-menu">
        //                         <li><Link to={'#'} className="dropdown-item">Action</Link></li>
        //                         <li><Link to={'#'} className="dropdown-item">Action</Link></li>
        //                         <li><Link to={'#'} className="dropdown-item">Action</Link></li>
        //                         <li><Link to={'#'} className="dropdown-item">Action</Link></li>
        //                     </ul>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link to={'#'} className="nav-link active">News</Link>
        //                 </li>
        //             </ul>
        //             <form className="d-flex" role="search">
        //                 <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
        //                 <button className="btn btn-outline-success" type="submit">Search</button>
        //             </form>
        //         </div>
        //     </div>
        // </nav>

        <nav class="navbar navbar-expand-lg navbar-dark">
                        <div class="container-fluid">
                            <Link to={'#'}>
                                <img src="imgLakmal/GreenfieldPro Logo.png" width={'100px'} />
                            </Link>
                            <a class="navbar-brand" href="#">&nbsp;Green Field Pro</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link act" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Contact Us</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">About Us</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="row">
                                <div className="col-sm">
                                    <Link to={`#`} className="btn btn-outline-success"><span className="button-text">Signup</span></Link><br />
                                </div>
                                <div className="col-sm">
                                    <Link to={`#`} className="btn btn-outline-success"><span className="button-text">Login</span></Link>
                                </div>
                            </div>
                        </div>
                    </nav>
    )
}

export default Navbar;
