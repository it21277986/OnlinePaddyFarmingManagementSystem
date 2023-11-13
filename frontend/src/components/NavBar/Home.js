import React from "react";
import './Home.css'
import { Link } from "react-router-dom";
import HeaderMain from "./HeaderMain";

// Define a data array for your cards
const cardData = [
    {
        title: "Card 1",
        text: "Explore the future of paddy farming with our innovative web application. Streamline your farming process, monitor crops, and make informed decisions. Your success, our priority.",
    },
    {
        title: "Card 2",
        text: "Streamline your farming process, monitor crops, and make informed decisions. Your success, our priority.",
    },
    {
        title: "Card 3",
        text: "Explore the future of paddy farming with our innovative web application. Streamline your farming process, monitor crops, and make informed decisions. Your success, our priority.",
    }
];

export default function Home() {
    return (

        <div>
            <HeaderMain style={{height:"20px"}}/>
            <section className="headerlth">
                <div className="container">
                    <nav class="navbar navbar-expand-lg navbar-dark">
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            </div>
                        </div>
                    </nav>
                    {/* navbar ends here */}
                    <div className="middlelth">
                        <h1 className="text-white fw-bold display-3" style={{paddingRight:'100px'}}>We Help you to <span className="theme-text">Online Paddy Farming.</span></h1>
                    </div>
                </div>
                <svg className="wavelth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFFF" fill-opacity="1" d="M0,224L60,224C120,224,240,224,360,234.7C480,245,600,267,720,272C840,277,960,267,1080,234.7C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            </section>
            <br />
            <div className="container">
                <div className="row">
                        
                        <div className="col-sm middleinlth">
                            <div className="card1lth">
                                <div className="card-bodylth">
                                <Link to={'../pmhome'}>
                                    <h5 className="card-titlelth">Paddy Mill Register</h5></Link>
                                    <p  style={{color:"white"}} className="plth">Explore the future of paddy farming with our innovative web application. Streamline your farming process, monitor crops, and make informed decisions. Your success, our priority.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-sm middleinlth">
                            <div className="card2lth">
                                <div className="card-bodylth">
                                <Link to={'../addSociety'}>
                                    <h5 className="card-titlelth">Society Register</h5></Link>
                                    <p style={{color:"white"}} className="plth">Explore the future of paddy farming with our innovative web application. Streamline your farming process, monitor crops, and make informed decisions. Your success, our priority.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm middleinlth">
                            <div className="card3lth">
                                <div className="card-bodylth">
                                <Link to={'../addBreakdown'}>
                                    <h5 className="card-titlelth">System Breakdown</h5></Link>
                                    <p style={{color:"white"}} className="plth">Explore the future of paddy farming with our innovative web application. Streamline your farming process, monitor crops, and make informed decisions. Your success, our priority.</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <br />
        </div>
    )
}
