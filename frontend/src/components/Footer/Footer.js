import React from "react";
import './Footer.css';

export default function Footer() {
    return(
        <div>
            <footer className="bg-dark text-white pt-5 pb-4">
                <div className="container text-center text-md-left">
                    <div className="row text-center text-md-left">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3" style={{textAlign:'left'}}>
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Green Field Pro</h5>
                            <p>Explore the future of paddy farming with our innovative web application. Streamline your farming process, monitor crops, and make informed decisions. Your success, our priority.</p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3" style={{textAlign:'left'}}>
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Products</h5>
                            <p>
                                <a href="" className="text-white a1">Bootstrap 5</a>
                            </p>
                            <p>
                                <a href="" className="text-white a1">Fontawesome</a>
                            </p>
                            <p>
                                <a href="" className="text-white a1">ReCharts</a>
                            </p>
                            <p>
                                <a href="" className="text-white a1">unDraw</a>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3" style={{textAlign:'left'}}>
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Useful Links</h5>
                            <p>
                                <a href="" className="text-white a1">Your Account</a>
                            </p>
                            <p>
                                <a href="" className="text-white a1">Weather</a>
                            </p>
                            <p>
                                <a href="" className="text-white a1">Raise Ticket</a>
                            </p>
                            <p>
                                <a href="" className="text-white a1">Help</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3" style={{textAlign:'left'}}>
                            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contacts</h5>
                            <p>
                                <i className="fas fa-home mr-3"></i>  438/7, Pittugala, Malabe.
                            </p>
                            <p>
                                <i className="fas fa-envelope mr-3"></i>  greenfeildpro@gmail.com
                            </p>
                            <p>
                                <i className="fas fa-phone mr-3"></i>  011-1234567
                            </p>
                        </div>
                    </div>
                    <hr className="border border-warning border-2 opacity-50"/>
                    <div className="row align-item-center">
                        <div className="col-md-7 col-lg-8" style={{textAlign:'left'}}>
                            <p>Copyright ©2023 All right reserved by : 
                                <a href="" className=""><strong className="text-warning">The Providers</strong></a>
                            </p>
                        </div>
                        <div className="col-md-5 col-lg-4">
                            <div className="text-center text-md-right">
                                <ul className="list-unstyled list-inline">
                                    <li className="list-inline-item">
                                        <a href="" className="btn-floating btn-sm text-white a2"><i className="fab fa-facebook"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="" className="btn-floating btn-sm text-white a2"><i className="fab fa-whatsapp"></i></a>
                                    </li> 
                                    <li className="list-inline-item">
                                        <a href="" className="btn-floating btn-sm text-white a2"><i className="fab fa-twitter"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="" className="btn-floating btn-sm text-white a2"><i className="fab fa-google-plus"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="" className="btn-floating btn-sm text-white a2"><i className="fab fa-linkedin-in"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </div>
    )
}